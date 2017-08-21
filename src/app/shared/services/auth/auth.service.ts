import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// 3rd modules
import * as moment from 'moment';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable, Subscription } from 'rxjs';

// App modules
import { UserInfo, UserToken, ApiResponse } from '../../models';
import { AppConstant } from '../../../app.constant';


@Injectable()
export class AuthService {
  private _currentUser: UserInfo;
  private _userToken: UserToken;

  private _refreshSubscription: Subscription;

  constructor(private _http: Http,
              private _localStorage: LocalStorageService) {
  }

  get currentUser(): UserInfo {
    if (this._currentUser && this._currentUser.id) {
      return this._currentUser;
    }

    this._currentUser = this._localStorage.get('userInfo') as UserInfo;

    if (!this._currentUser) {
      this._currentUser = new UserInfo();
    }
    return this._currentUser;
  }

  set currentUser(info: UserInfo) {
    this._currentUser = Object.assign(this.currentUser, info);
    this._localStorage.set('userInfo', info);
  }

  get isAuthenticated(): boolean {
    return !!this._localStorage.get('userToken');
  }

  get userToken(): UserToken {
    if (this._userToken && this._userToken.accessToken) {
      return this._userToken;
    }

    this._userToken = this._localStorage.get('userToken') as UserToken;

    if (!this._userToken) {
      this._userToken = new UserToken();
    }
    return this._userToken;
  }

  set userToken(token: UserToken) {
    this._userToken = Object.assign(token);
    this._localStorage.set('userToken', token);
    this._localStorage.set('logged-time', new Date().toISOString());
  }

  public setToken(userToken?: UserToken): void {
    if (!userToken) {
      this.clear();
    } else {
      this.currentUser = userToken.basicInfo;
      this.userToken = userToken;
    }
  }

  public clear(): void {
    this._userToken = new UserToken();
    this._currentUser = new UserInfo();
    this._localStorage.remove('userInfo');
    this._localStorage.remove('userToken');
    this._localStorage.remove('logged-time');
  }

  public signup(data): Observable<ApiResponse<any>> {
    return this._http.post(`${AppConstant.domain}/profile/signup`, data)
      .map((resp) => resp.json());
  }

  public authorize(data, refreshToken?: boolean): Observable<ApiResponse<UserToken>> {
    if (!refreshToken) {
      let body = {
        email: data.email,
        password: data.password
      };
      return this._http.post(`${AppConstant.domain}/a-api/login`, body)
        .map((resp) => resp.json())
        .catch(this._handleError);

    } else {
      let userToken: UserToken = this._localStorage.get('userToken') as UserToken;
      let body = {
        refreshToken: userToken.refreshToken
      };
      return this._http.post(`${AppConstant.domain}/a-api/token/refresh`, body)
        .map((resp) => resp.json());
    }
  }

  public logout(): Observable<ApiResponse<any>> {
    if (this._refreshSubscription) {
      this._refreshSubscription.unsubscribe();
    }

    return this._http.delete(`${AppConstant.domain}/profile/token`)
      .map((resp) => resp.json());
  }

  public forgotPassword(data): Observable<ApiResponse<any>> {
    return this._http.post(`${AppConstant.domain}/code`, data)
      .map((resp) => resp.json());
  }

  public verifyCode(data): Observable<ApiResponse<any>> {
    return this._http.post(`${AppConstant.domain}/code/verify`, data)
      .map((resp) => resp.json());
  }

  public resetPassword(data): Observable<ApiResponse<any>> {
    return this._http.post(`${AppConstant.domain}/profile/password/reset`, data)
      .map((resp) => resp.json());
  }

  public refreshToken(): void {
    if (this.userToken && this.userToken.expiresIn) {
      let dueTime = this.timeToExpire();
      dueTime = dueTime > 10000 ? dueTime - 10000 : 0;
      let scheduleTime = this.userToken.expiresIn * 1000 - 10000; // Call get new token before 10s

      if (this._refreshSubscription) {
        this._refreshSubscription.unsubscribe();
      }
      this._refreshSubscription = Observable.timer(dueTime, scheduleTime).subscribe(() => {
        this.authorize(null, true).subscribe((resp: ApiResponse<UserToken>) => {
          this.userToken = resp.data;
        });
      });
    }
  }

  public timeToExpire() {
    let loggedTime = this._localStorage.get('logged-time');

    return moment(loggedTime).add(this.userToken.expiresIn, 'seconds').diff(moment());
  }

  public isTokenExpired() {
    let loggedTime = this._localStorage.get('logged-time');

    return moment().diff(moment(loggedTime).add(this.userToken.expiresIn, 'seconds')) >= 0;
  }

  public getUserInfo(): Observable<ApiResponse<UserInfo>> {
    return this._http.get(`${AppConstant.domain}/api/profile/basic-info`)
      .map((resp) => resp.json())
      .catch(this._handleError);
  }

  /**
   * fillInfo
   * @param obj
   */
  public updateUserInfo(obj: UserInfo): void {
    this.currentUser = Object.assign(this.currentUser, obj);
  }
  /**
   * Check valid token for resetting password
   * @param token
   * @returns {Observable<R>}
   */
  public checkTokenForgotPassword(token: string): Observable<ApiResponse<null>> {
    let url = window.location.protocol + '//' + window.location.host;
    let obj = {
      code: token,
      type: 0,
      // callBackUri: `${url}/#/account/reset-password`
    };
    return this._http.post(`${AppConstant.domain}/api/code/valid`, obj)
      .map((resp) => resp.json())
      .catch(this._handleError);
  }

  /**
   * Error handler for observable
   * @param error
   * @returns {any}
   * @private
   */
  private _handleError(error: Response): Observable<ApiResponse<null>> {
    return Observable.throw(error.json());
  }

}
