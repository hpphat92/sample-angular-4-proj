import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AppConstant } from "../../app.constant";

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  public items = [];

  constructor(private _http: Http) {
    this._http.get(`${AppConstant.domain}/w-api/portfolios`).map((json) => json.json()).subscribe((resp) => {
      this.items = resp.data;
    })
  }

}
