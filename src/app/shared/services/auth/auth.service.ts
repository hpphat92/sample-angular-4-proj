import { Injectable } from '@angular/core';

// 3rd modules
import * as moment from 'moment';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable, Subscription } from 'rxjs';

// App modules
import { UserInfo, UserToken, ApiResponse } from '../../models';
import { AppConstant } from '../../../app.constant';
import { Router } from "@angular/router";
import { ExtendedHttpService } from "../http/http.service";
import { Subject } from "rxjs/Subject";


@Injectable()
export class AuthService {
  private _currentUser: UserInfo = null;
  private _userToken: UserToken;
  private subscription: any = null;

  private _refreshSubscription: Subscription;
  private nameSource = new Subject<any>();

  constructor(private _http: ExtendedHttpService,
              private _localStorage: LocalStorageService,
              private _router: Router) {
    this.currentUserInfo$ = this.nameSource.asObservable();
  }

  public fromUnAuthPage: boolean = false;
  public currentUserInfo$;

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
    this.nameSource.next(this._currentUser);
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
      // this.currentUser = userToken.basicInfo;
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
    return this._http.post(`${AppConstant.domain}/w-api/signup`, data)
      .map((resp) => resp.json());
  }

  public authorize(data, refreshToken?: boolean): Observable<ApiResponse<UserToken>> {
    if (!refreshToken) {
      let body = {
        email: data.email,
        password: data.password
      };
      return this._http.post(`${AppConstant.domain}/w-api/login`, body)
        .map((resp) => resp.json())
        .catch(this._handleError);

    } else {
      let userToken: UserToken = this._localStorage.get('userToken') as UserToken;
      let body = {
        refreshToken: userToken ? userToken.refreshToken : ''
      };
      if (!userToken) {
        return;
      }
      return this._http.post(`${AppConstant.domain}/w-api/token/refresh`, body)
        .map((resp) => resp.json());
    }
  }

  public logout(): Observable<ApiResponse<any>> {
    this.clear();
    return this._http.delete(`${AppConstant.domain}/w-api/logout`).flatMap(() => {
      return new Observable((observer) => {
        if (this._refreshSubscription) {
          this._refreshSubscription.unsubscribe();
        }
        observer.next();
        observer.complete();
      });

    })
  }

  public forgotPassword(data): Observable<ApiResponse<any>> {
    return this._http.post(`${AppConstant.domain}/w-api/forgot-password/check-account`, data)
      .map((resp) => resp.json());
  }

  public verifyCode(data): Observable<ApiResponse<any>> {
    return this._http.post(`${AppConstant.domain}/w-api/forgot-password/verify-code`, data)
      .map((resp) => resp.json());
  }

  public resetPassword(data): Observable<ApiResponse<any>> {
    return this._http.post(`${AppConstant.domain}/w-api/forgot-password/new-password`, data)
      .map((resp) => resp.json());
  }

  /**
   * Change password for profile
   * @param data
   * @returns {Observable<R>}
   */
  public changePassword(data): Observable<ApiResponse<any>> {
    return this._http.put(`${AppConstant.domain}/w-api/profile/password`, data)
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
        let p = this.authorize(null, true);
        p && p.subscribe((resp: ApiResponse<UserToken>) => {
          this.userToken = resp.data;
        }, () => {
          this.clear();
          this._router.navigateByUrl('/home/login');
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

  public getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.currentUser.isAuth) {
        resolve();
        return;
      }
      if (this.subscription) {
        this.subscription.subscribe(() => {
          this.subscription = null;
          resolve();
        });
        return;
      }
      this.subscription = this._http.get(`${AppConstant.domain}/w-api/profile/basic-info`);
      this.subscription
        .map((resp) => resp.json())
        .catch(this._handleError)
        .subscribe((resp) => {
          this.subscription = null;
          this.updateUserInfo(resp.data);
          resolve();
        });
    });
  }

  /**
   * fillInfo
   * @param obj
   */
  public updateUserInfo(obj: UserInfo): void {
    this.currentUser = Object.assign(this.currentUser, obj);
    this.currentUser.isAuth = true;
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
   * Update user profile
   * @param user data
   * @returns {Observable<R>}
   */
  public updateUserProfile(data: any): Observable<ApiResponse<null>> {
    return this._http.put(`${AppConstant.domain}/w-api/profile`, data)
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
