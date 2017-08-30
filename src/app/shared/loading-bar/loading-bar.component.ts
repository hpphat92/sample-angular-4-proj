import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { LoadingBarService } from "./loading-bar.service";
@Component({
  selector: 'loading-bar',
  template: '<div></div>',
  styleUrls: ['./loading-bar.scss']
})
export class LoadingBar implements AfterViewInit{

  @Input()
  public loadingBarId;

  ngAfterViewInit(): void {
    this._loadingBarService.registerControl({
      element: this._elementRef.nativeElement,
      id: this.loadingBarId,
    })
  }
  constructor(private _loadingBarService: LoadingBarService, private _elementRef: ElementRef) {

  }
}
