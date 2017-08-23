import { AfterViewInit, Component } from '@angular/core';
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalState } from "../../global.state";

@Component({
  selector: 'portfolio-detail',
  styleUrls: ['./portfolio-detail.scss'],
  templateUrl: './portfolio-detail.html'
})
export class PortfolioDetail {
  public portfolioDetail = [];

  constructor(private _http: ExtendedHttpService, private _activatedRoute: ActivatedRoute, private _state: GlobalState) {
    this._activatedRoute.params.subscribe((params) => {
      this._http.get(`${AppConstant.domain}/w-api/portfolios/${params['id']}`).map((json) => json.json()).subscribe((resp) => {
        this.portfolioDetail = resp.data;
        this._state.notifyDataChanged('menu.activeLink', {
          title: 'Portfolio Detail'
        });
      })
    })
  }

}
