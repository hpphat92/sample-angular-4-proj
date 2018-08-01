import { Component, ViewEncapsulation, AfterViewInit, ElementRef, HostListener } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cleanSession } from 'selenium-webdriver/safari';

@Component({
  selector: 'terms-conditions',
  templateUrl: 'terms-conditions.component.html',
  styleUrls: [ 'terms-conditions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermAndConditionsComponent implements AfterViewInit {
  public title: string = 'Terms & Conditions';
  public termsAndConditions: string;
  public isMobile: boolean = !!navigator.userAgent && /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(navigator.userAgent.toLowerCase());

  constructor(private _activeModal: NgbActiveModal,
              private _elementRef: ElementRef) {}

  ngAfterViewInit() {
    let iframes = Array.from(this._elementRef.nativeElement.querySelectorAll('iframe'));
    if (!iframes.length) {
      return;
    }
    let iframe = iframes.find((i) => 'terms-conditions' == (i as any).getAttribute('id'));
    if (iframe) {
      (iframe as any).contentDocument.open();
      (iframe as any).contentDocument.write(this.termsAndConditions || '');
      (iframe as any).contentDocument.close();
      (iframe as any).width = (iframe as any).parentElement.clientWidth - 30;
      (iframe as any).height = (iframe as any).contentWindow.document.body.clientWidth - (this.isMobile ? 5 : 30);
    }

    setTimeout(() => this.onWindowResize(), 100);
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    let iframes = Array.from(this._elementRef.nativeElement.querySelectorAll('iframe'));
    if (!iframes.length) {
      return;
    }
    let iframe = iframes.find((i) => 'terms-conditions' == (i as any).getAttribute('id'));
    if (iframe) {
      (iframe as any).width = (iframe as any).parentElement.clientWidth - 30;
      (iframe as any).height = (iframe as any).contentWindow.document.body.clientWidth - (this.isMobile ? 5 : 30);
    }
  }

  public close(): void {
    this._activeModal.dismiss();
  }
}