import { AfterViewInit, Component, OnDestroy, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalState } from "../../global.state";
import * as url from "url";

@Component({
  selector: 'customisation',
  styleUrls: ['./customisation.scss'],
  templateUrl: './customisation.html'
})
export class Customisation implements OnDestroy {
  public customisationDetail;
  public selectedService = '';
  public customSheetURL: SafeUrl;


  constructor(private _http: ExtendedHttpService, private _activatedRoute: ActivatedRoute, private _state: GlobalState,
              private _sanitizer: DomSanitizer) {
    this._activatedRoute.params.subscribe((params) => {
      this._http.get(`${AppConstant.domain}/w-api/companies/${params['id']}`).map((json) => json.json()).subscribe((resp) => {
        this.customisationDetail = resp.data;
        this._state.notifyDataChanged('menu.activeLink', {
          title: `Service Customisation for ${(this.customisationDetail as any).name}`
        });
      }, () => {
      })
    })
  }

  public byPassUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public changeService(e) {
    let serviceObj = this.customisationDetail.services && this.customisationDetail.services.find((service) => {
        return service.id == e;
      });
    if (serviceObj) {
      this.customSheetURL = this._sanitizer.bypassSecurityTrustResourceUrl(serviceObj.customSheetURL);
    }
  }

  public ngOnDestroy(): void {
    this._state.notifyDataChanged('menu.toggleDisplay', {
      hide: false
    });
  }
}
