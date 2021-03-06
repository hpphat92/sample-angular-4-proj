import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "../auth/auth.service";

import "rxjs/add/operator/map";

import "rxjs/add/operator/take";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return new Promise((resolve) => {
      if (!this._authService.isAuthenticated) {
        // this._authService.logout();
        this.router.navigateByUrl('/home/login');
        resolve(false);
      } else {
        if (this._authService.isTokenExpired()) {
          this._authService.authorize(null, true).subscribe((resp) => {

            this._authService.setToken(resp.data);
            this._authService.refreshToken();

            resolve(true);
          }, (err) => {
            // this._authService.clear();
            this.router.navigateByUrl('/home/login');
            resolve(false);
          });
        } else {
          this._authService.refreshToken();
          resolve(true);
        }
      }
    });
  }
}

@Injectable()
export class AnonymousPage implements CanActivateChild {

  constructor(private _authService: AuthService, private router: Router, private _toast: ToastrService) {
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return new Promise((resolve) => {
      if (!this._authService.isAuthenticated || this._authService.isTokenExpired()) {
        document.body.classList.remove('imperson');
        resolve(true);
      } else {
        this._authService.fromUnAuthPage = true;
        // this._toast.info('You are already signed in', 'Info');
        resolve(false);
        this.router.navigate(['app', 'portfolio']);
      }
    });
  }
}

@Injectable()
export class AuthorizedPage implements CanActivateChild {

  constructor(private _authService: AuthService, private router: Router, private _toast: ToastrService) {
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return new Promise((resolve, reject) => {
      if (this._authService.isAuthenticated) {
        if (this._authService.isTokenExpired()) {
          this._authService.authorize(null, true).subscribe((resp) => {
            this._authService.setToken(resp.data);
            this._authService.refreshToken();
            this._authService.getUserInfo().then((response) => {
              resolve(true);
            }, () => {
              this._authService.logout();
              this.router.navigateByUrl('/home/login');
              reject(false);
            });
          }, (err) => {
            this._authService.clear();
            this.router.navigate(['login']);
            resolve(false);
          });
        } else {
          this._authService.refreshToken();
          this._authService.getUserInfo().then((response) => {
            resolve(true);
          }, () => {
            this._authService.logout();
            this.router.navigateByUrl('/home/login');
            reject(false);
          });
        }
      } else {
        // this._authService.fromUnAuthPage = true;
        // this._toast.info('You are already signed in', 'Info');
        this._authService.logout();
        this.router.navigateByUrl('/home/login');
        reject(false);
      }
    });
  }
}
