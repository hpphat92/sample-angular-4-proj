import { EventEmitter, Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ApiResponse } from '../../models';
import { AppConstant } from '../../../app.constant';
import { ExtendedHttpService } from "../../services/http/http.service";

@Injectable()
export class EmbeddedCodeService {
  private path = "w-api/embeddedcodes";

  constructor(private _http: ExtendedHttpService) {
  }

  public getEmbeddedCode(key: string): Observable<ApiResponse<any[]>> {
    return this._http.get(`${AppConstant.domain}/${this.path}/${key}`)
    .map(this.extractData)
    .catch(this.handleError);
  }


  public extractData(resp: any): any {
    const body = resp.json();
    return body || {};
  }

  public handleError(error: Response): Observable<ApiResponse<null>> {
    return Observable.throw(error.json());
  }
}
