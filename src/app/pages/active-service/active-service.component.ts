import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService, EmbeddedCodeService } from "../../shared/services";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalState } from "../../global.state";

@Component({
  selector: 'active-service',
  styleUrls: ['./active-service.scss'],
  templateUrl: './active-service.html'
})
export class ActiveService implements AfterViewInit {
  public activeService = [];
  public embeddedcodes: any[];

  constructor(private _state: GlobalState,
    private elementRef: ElementRef,
    private _renderer2: Renderer2,
    private _embeddedCodeService: EmbeddedCodeService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._state.notifyDataChanged('menu.activeLink', {
        title: 'Service Activation Request'
      });
    }, 500);

    this._embeddedCodeService.getEmbeddedCode("active-service").subscribe(resp => {
      let embedCode = resp.data && (resp.data.length > 0) ? resp.data[0].embeddedUrl : "";
      this.appendHtml(embedCode);
      // let s = document.createElement("script");
      // s.type = "text/javascript";
      // s.onload = (e) => {
      //   this.elementRef.nativeElement.querySelector('.container-iframe').innerHTML = strHtml;
      //   document.write = oldDocumentWrite;
      // };
      // s.src = resp.data && (resp.data.length > 0) ? resp.data[0].embeddedUrl : "";
      // // this.elementRef.nativeElement.appendChild(s);
      // let oldDocumentWrite = document.write;
      // let strHtml = '';
      // document.write = (node) => {
      //   strHtml += node;
      // };
      // this._renderer2.appendChild(this.elementRef.nativeElement, s);
    });
  }

  private appendHtml(htmlString) {
    if (!htmlString) {
      return;
    }
    let iframe = document.createElement('iframe');
    iframe.setAttribute('style', 'width: 100%; height: 100%;display:block;');
    iframe.setAttribute('frameBorder', '0');
    this._renderer2.appendChild(this.elementRef.nativeElement.querySelector('.container-iframe'), iframe);

    let iframeDoc = iframe.contentDocument || iframe.contentWindow;
    if ((iframeDoc as any).document) {
      iframeDoc = (iframeDoc as any).document;
    }
    iframeDoc.open();
    (iframeDoc as any).write(htmlString);
    (iframeDoc as any).write('<style>iframe {border: 0; width: calc(100% - 1px); height: 100%;} body {margin-top: 0; margin-bottom: 0;}</style>');
    iframeDoc.close();
    // setTimeout(() => {
    //   (iframe as any).width = (iframeDoc as any).body.scrollWidth;
    //   (iframe as any).height = (iframeDoc as any).body.scrollHeight;
    // }, 5000);

  }
}
