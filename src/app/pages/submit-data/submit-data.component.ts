import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { isViewDebugError } from "@angular/core/src/view/errors";

import { EmbeddedCodeService } from "../../shared/services";

@Component({
  selector: 'submit-data',
  styleUrls: ['./submit-data.scss'],
  templateUrl: './submit-data.html'
})
export class SubmitData implements AfterViewInit {

  constructor(private elementRef: ElementRef, private _renderer2: Renderer2, private _embeddedCodeService: EmbeddedCodeService) {
  }

  ngAfterViewInit() {
    this._embeddedCodeService.getEmbeddedCode("submit-data").subscribe(resp => {
      let embeddedCode = resp.data && (resp.data.length > 0) ? resp.data[0].embeddedUrl : "";
      $(embeddedCode).appendTo(document.body);
      // this.appendHtml('container-iframe', embeddedCode);
      // let s = document.createElement("script");
      // s.type = "text/javascript";
      // s.onload = (e) => {
      //   document.write = oldDocumentWrite;
      //   this.elementRef.nativeElement.querySelector('iframe').style.width = '400px';
      //   this.elementRef.nativeElement.querySelector('iframe').style['max-width'] = '100%';
      // };
      // s.src = "https://alythex.app.box.com/upload-widget/embed.js?folderID=33922264492&title=Secure%20File%20Submission%3A%20Client%20Demo&isDescriptionFieldShown=1&isEmailRequired=1&width=385&height=420&token=33c71g6l77ppaugb5c14vz6l1oyr01kb&callback=callback";
      // s.src = resp.data && (resp.data.length > 0) ? resp.data[0].embeddedUrl : "";
      // this.elementRef.nativeElement.appendChild(s);
      // let oldDocumentWrite = document.write;
      document.write = (node) => {
        this.elementRef.nativeElement.querySelector('.container-iframe').innerHTML = node;
        this.elementRef.nativeElement.querySelector('iframe').style.width = '400px';
        this.elementRef.nativeElement.querySelector('iframe').style['max-width'] = '100%';
      }
    });
  }

  private appendHtml(selector, htmlString) {
    if (!htmlString) {
      return;
    }
    let iframe = document.createElement('iframe');
    iframe.setAttribute('style', 'width: 100%; height: 100%;display:block;');
    iframe.setAttribute('frameBorder', '0');
    this._renderer2.appendChild(this.elementRef.nativeElement.querySelector(selector), iframe);

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
