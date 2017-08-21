import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _auth: AuthService) { }

  canActivate() {
    return new Promise((resolve) => {
      if (!this._auth.isAuthenticated) {
        this.router.navigate(['login']);
        resolve(false);
      } else {
        if (this._auth.isTokenExpired()) {
          this._auth.authorize(null, true).subscribe((resp) => {

            this._auth.setToken(resp.data);
            this._auth.refreshToken();

            resolve(true);
          }, (err) => {
            this.router.navigate(['login']);
            resolve(false);
          });
        } else {
          this._auth.refreshToken();
          resolve(true);
        }
      }
    });
  }
}
