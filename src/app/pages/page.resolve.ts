import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";

@Injectable()
export class CheckTokenResolve implements Resolve<any> {

  constructor(private _http: Http, private route: ActivatedRoute) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let self = this;
    debugger;
    return new Promise((resolve, reject) => {
      self.route.params.subscribe(
        (param: any) => {
          debugger;

          resolve();
        });
    });
  }
}
export const SHARE_RESOLVES = [
  CheckTokenResolve
];
