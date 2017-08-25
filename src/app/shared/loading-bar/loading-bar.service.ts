import { Injectable } from "@angular/core";
@Injectable()
export class LoadingBarService {

  private _listLoadingBarCtrl = [];

  constructor() {
  }

  public registerControl(control) {

    if (!control.element || !control.id) {
      throw new Error('[Loading Bar Component] Element or Id is not found.');
    }

    this._listLoadingBarCtrl.push(control);
    // control.element.classList.add('hidden');
  }

  public showLoading(loadingName) {
    if (!loadingName) {
      return;
    }
    let loadingControl = this._listLoadingBarCtrl.find((ctrl) => {
      return ctrl.id === loadingName;
    });
    if (loadingControl) {
      loadingControl.element.classList.remove('hidden');
    }
  }

  public hideLoading(loadingName = '') {
    if (!loadingName) {
      this._listLoadingBarCtrl.forEach((control) => {
        control.element.classList.add('hidden');
      });
      return;
    }
    this._listLoadingBarCtrl.forEach((control) => {
      if (control.id === loadingName) {
        control.element.classList.add('hidden');
      }
    });
  }
}
