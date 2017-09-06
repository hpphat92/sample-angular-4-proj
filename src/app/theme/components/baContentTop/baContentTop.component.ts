import { Component } from '@angular/core';

import { GlobalState } from '../../../global.state';

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop {

  public activePageTitle: string = '';
  public isHidden: boolean = false;

  constructor(private _state: GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.alternateTitle || activeLink.title;
      }
    });
    this._state.subscribe('menu.toggleDisplay', (status) => {
      this.isHidden = status.hide;
    });
  }
}
