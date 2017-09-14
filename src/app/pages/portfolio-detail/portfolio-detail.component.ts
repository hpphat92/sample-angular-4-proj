import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalState } from "../../global.state";

@Component({
  selector: 'portfolio-detail',
  styleUrls: ['./portfolio-detail.scss'],
  templateUrl: './portfolio-detail.html'
})
export class PortfolioDetail implements OnDestroy {

  public portfolioDetail = [];
  public hideReport: boolean = true;

  constructor(private _http: ExtendedHttpService, private _activatedRoute: ActivatedRoute, private _state: GlobalState) {
    this._state.notifyDataChanged('menu.toggleDisplay', {
      hide: true
    });
    this._activatedRoute.params.subscribe((params) => {
      this.hideReport = true;
      this._http.get(`${AppConstant.domain}/w-api/portfolios/${params['id']}`).map((json) => json.json()).subscribe((resp) => {
        this.portfolioDetail = resp.data;
        this.hideReport = false;
        this._state.notifyDataChanged('menu.activeLink', {
          title: `${(this.portfolioDetail as any).company.name} / ${(this.portfolioDetail as any).service.name}`
        });
      }, () => {
        this.hideReport = false;
      })
    })
  }

  public ngOnDestroy(): void {
    this._state.notifyDataChanged('menu.toggleDisplay', {
      hide: false
    });
  }
}
