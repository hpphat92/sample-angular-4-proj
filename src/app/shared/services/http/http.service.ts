import { Injectable } from '@angular/core';
import {
  Request,
  XHRBackend,
  RequestOptions,
  Response,
  Http,
  RequestOptionsArgs,
  Headers,
  QueryEncoder
} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from 'angular-2-local-storage';
import { UserToken } from '../../models/user-token.model';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ProgressService } from "../progress/progress.service";

// https://www.illucit.com/blog/2016/03/angular2-http-authentication-interceptor/
@Injectable()
export class ExtendedHttpService extends Http {

  private _httpCounter: number = 0;

  constructor(backend: XHRBackend,
              defaultOptions: RequestOptions,
              private localStorageService: LocalStorageService,
              private _toast: ToastrService,
              private _router: Router,
              private progressService: ProgressService) {
    super(backend, defaultOptions);
  }

  public request(url: string | Request, options?: any): Observable<Response> {
    return super.request(url, options);
    // return this.intercept(super.request(url, this.getRequestOptionArgs(null, options)), config);
  }

  public get(url: string, options?: any): Observable<Response> {
    // debugger;
    return this.intercept(super.get(url, this.getRequestOptionArgs(url, options)), options);
  }

  public post<T>(url: string, body: T, options?: any): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(url, options)), options);
  }

  public put<T>(url: string, body: T, options?: any): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(url, options)), options);
  }

  public delete(url: string, options?: any): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs(url, options)), options);
  }

  public patch<T>(url: string, body: T, options?: any): Observable<Response> {
    return this.intercept(super.patch(url, body, this.getRequestOptionArgs(url, options)), options);
  }

  public getRequestOptionArgs(url?: string, options?: any): any {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }

    options.headers.append('Accept', 'application/json');

    let token: UserToken = this.localStorageService.get('userToken') as UserToken;

    if (url && token) {

      options.headers.append('Authorization', `Bearer ${token.accessToken}`);
    }

    return options;
  }

  public intercept(observable: Observable<Response>, config?: any): Observable<Response> {
    let args = arguments;
    config = config || {};
    let shareRequest = observable.share();
    this.showProgress();
    shareRequest.map((resp) => resp.json()).subscribe(
      (resp) => {
        // subscribe
        if (resp.message) {
          this._toast.success(resp.message, 'Success');
        }
        this.hideProgress();
      },
      (err) => {
        try {
          if (!config.skipAlert && err.status !== 403 && err.status !== 401) {
            let errObj = JSON.parse(err._body);
            this._toast.error(errObj.message, "Error");
          }
          if (err.status === 401) {
            this.localStorageService.remove('userInfo');
            this.localStorageService.remove('userToken');
            this.localStorageService.remove('logged-time');
            this._router.navigate(['home', 'login']);

            // error
            this.hideProgress();
            return;
          }
          if (err.status === 403) {
            this._router.navigate(['forbidden']);
            // error
            this.hideProgress();
            return;
          }
          this.hideProgress();
        } catch (e) {
          this.hideProgress();
        }

      },
      () => {
        // complete
        // this.hideProgress();
      }
    );

    return shareRequest
      .catch((err, source) => {
        return Observable.throw(err);
      });
  }

  private showProgress() {
    this.progressService.start();
  }

  private hideProgress() {
    this.progressService.done();
  }
}

export class MyQueryEncoder extends QueryEncoder {
  encodeKey(k: string): string {
    return encodeURIComponent(k);
  }

  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }
}
