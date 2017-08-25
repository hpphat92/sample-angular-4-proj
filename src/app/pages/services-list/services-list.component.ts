import { Component } from '@angular/core';
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";
import { GlobalState } from "../../global.state";

@Component({
  selector: 'services-list',
  styleUrls: ['./services-list.scss'],
  templateUrl: './services-list.html'
})
export class ServicesList {
  public items = [];
  public position = {
    position: 'top cursor'
  };

  constructor(private _http: ExtendedHttpService, private _state: GlobalState) {
    this._http.get(`${AppConstant.domain}/w-api/services/all`).map((json) => json.json()).subscribe((resp) => {
      this.items = resp.data;
      this._state.notifyDataChanged('menu.activeLink', {
        title: 'Alythex Services'
      });
    });
  }

}
