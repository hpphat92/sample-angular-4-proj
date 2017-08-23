import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { ExtendedHttpService } from "../shared/services/http/http.service";

@Injectable()
export class CheckTokenResolve implements Resolve<any> {

  constructor(private _http: ExtendedHttpService, private route: ActivatedRoute) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let self = this;
    return new Promise((resolve, reject) => {
      self.route.params.subscribe(
        (param: any) => {
          resolve();
        });
    });
  }
}
export const SHARE_RESOLVES = [
  CheckTokenResolve
];
