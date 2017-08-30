import {
  Injectable,
  EventEmitter
} from '@angular/core';

import NProgress from 'nprogress';
import { LoadingBarService } from "../../loading-bar/loading-bar.service";

@Injectable()
export class ProgressService {
  public onStart = new EventEmitter<boolean>();
  public onDone = new EventEmitter<boolean>();

  private _isStarted: boolean = false;
  private _counter: number = 0;
  private _doneTimeout;

  constructor(private _loadingBarService: LoadingBarService) {
  }

  public start() {
    this._isStarted = true;
    this._counter++;
    this._loadingBarService.showLoading('global-app');
    // NProgress.start();
    if (this._doneTimeout) {
      clearTimeout(this._doneTimeout);
    }
    this.onStart.emit(true);
  }

  public done() {
    this._counter--;
    if (this._counter <= 0) {
      this._counter = 0;
      this._isStarted = false;
      this._doneTimeout = setTimeout(() => {
        this._loadingBarService.hideLoading('global-app');
      }, 400);
      this.onDone.emit(true);
    }
  }
}
