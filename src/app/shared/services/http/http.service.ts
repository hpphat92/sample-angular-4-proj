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

// https://www.illucit.com/blog/2016/03/angular2-http-authentication-interceptor/
@Injectable()
export class ExtendedHttpService extends Http {

  private _httpCounter: number = 0;

  constructor(backend: XHRBackend,
              defaultOptions: RequestOptions,
              private localStorageService: LocalStorageService) {
    super(backend, defaultOptions);
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, this.getRequestOptionArgs(null, options)));
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    // debugger;
    return this.intercept(super.get(url, this.getRequestOptionArgs(url, options)));
  }

  public post<T>(url: string, body: T, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(url, options)));
  }

  public put<T>(url: string, body: T, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(url, options)));
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs(url, options)));
  }

  public patch<T>(url: string, body: T, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.patch(url, body, this.getRequestOptionArgs(url, options)));
  }

  public getRequestOptionArgs(url?: string, options?: RequestOptionsArgs): RequestOptionsArgs {
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

  public intercept(observable: Observable<Response>): Observable<Response> {
    let shareRequest = observable.share();
    this.showProgress();
    shareRequest.subscribe(
      () => {
        // subscribe
        this.hideProgress();
      },
      () => {
        // error
        this.hideProgress();
      },
      () => {
        // complete
        this.hideProgress();
      }
    );
    
    return shareRequest
      .catch((err, source) => {
        return Observable.throw(err);
      });
  }

  private showProgress() {
    // this.progressService.start();
  }

  private hideProgress() {
    // this.progressService.done();
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
