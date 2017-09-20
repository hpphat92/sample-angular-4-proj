import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute, Route, Router } from "@angular/router";
import { ExtendedHttpService } from "../shared/services/http/http.service";
import { UserToken } from "../shared/models/user-token.model";
import { AuthService } from "../shared/services/auth/auth.service";
import { NotSupportMobileModalComponent } from "../shared/not-support-mobile/not-support-mobile.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
@Injectable()
export class CheckMobileVisible implements Resolve<any> {
  constructor(private _modalService: NgbModal,
              private _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      if (/Mobi/.test(navigator.userAgent)) {
        // mobile!

        let modalRef = this._modalService.open(NotSupportMobileModalComponent);
        modalRef.result.then(data => {
          this._router.navigate(['app', 'portfolio']);
          resolve();
        }, (err) => {
          this._router.navigate(['app', 'portfolio']);
          resolve();
        });
      } else {
        // [routerLink]="item.id?['/app/customisation/'+item.id]:['']"
        resolve();
      }
    })
  }
}
export const SHARE_RESOLVES = [
  CheckAdminToken,
  CheckMobileVisible
];

