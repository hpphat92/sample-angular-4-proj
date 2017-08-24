import { Component } from '@angular/core';
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";

@Component({
  selector: 'portfolio',
  styleUrls: ['./portfolio.scss'],
  templateUrl: './portfolio.html'
})
export class Portfolio {
  public items = [];
  public position = {
    position: 'top cursor'
  };

  constructor(private _http: ExtendedHttpService) {
    this._http.get(`${AppConstant.domain}/w-api/portfolios`).map((json) => json.json()).subscribe((resp) => {
      this.items = resp.data;
    })
  }

}
