import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute, Route, Router } from "@angular/router";
import { ExtendedHttpService } from "../shared/services/http/http.service";
import { UserToken } from "../shared/models/user-token.model";
import { AuthService } from "../shared/services/auth/auth.service";

@Injectable()
export class CheckAdminToken implements Resolve<any> {
  constructor(private _http: ExtendedHttpService, private _authService: AuthService,
              private _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      let params = route.queryParams;
      this._authService.logout();

      if (params.accesstoken && params.refreshtoken) {

        let userToken = new UserToken();
        userToken.accessToken = params.accesstoken || params.accessToken;
        userToken.refreshToken = params.refreshtoken || params.refreshToken;
        userToken.expiresIn = 1800;
        userToken.isLoggedInAsImperson = true;
        this._authService.setToken(userToken);
        if (this._router.url === '/app/portfolio') {
          // Reload
          (window as any).location.reload();
        } else {
          this._router.navigate(['app', 'portfolio']);
        }
        resolve();
      } else {
        this._router.navigate(['home', 'login']);
        resolve();
      }
    })
  }
}
export const SHARE_RESOLVES = [
  CheckAdminToken
];

