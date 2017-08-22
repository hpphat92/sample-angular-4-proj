import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

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
        this._authService.logout();
        this.router.navigateByUrl('/page/login');
        resolve(false);
      } else {
        if (this._authService.isTokenExpired()) {
          this._authService.authorize(null, true).subscribe((resp) => {

            this._authService.setToken(resp.data);
            this._authService.refreshToken();

            resolve(true);
          }, (err) => {
            this.router.navigateByUrl('/page/login');
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
export class AnonymousPage implements CanActivate {

  constructor(private _authService: AuthService, private router: Router, private _toast: ToastrService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return new Promise((resolve) => {
      if (!this._authService.isAuthenticated) {
        resolve(true);
      } else {
        this._authService.fromUnAuthPage = true;
        // this._toast.info('You are already signed in', 'Info');
        this.router.navigate(['app', 'dashboard']);
        resolve(false);
      }
    });
  }
}
