import { Component } from '@angular/core';
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  public items = [];

  constructor(private _http: ExtendedHttpService) {
    this._http.get(`${AppConstant.domain}/w-api/portfolios`).map((json) => json.json()).subscribe((resp) => {
      this.items = resp.data;
    })
  }

}
