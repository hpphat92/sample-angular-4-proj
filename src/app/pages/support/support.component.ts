import { OnInit, AfterViewInit, Component, ElementRef, Renderer2 } from "@angular/core";

import { EmbeddedCodeService } from "../../shared/services";

@Component({
  selector: 'support',
  styleUrls: ['support.scss'],
  templateUrl: './support.html'
})
export class Support implements OnInit, AfterViewInit {
  public embeddedUrl1: string;
  public embeddedUrl2: string;

  constructor(private elementRef: ElementRef, private _renderer2: Renderer2, private _embeddedCodeService: EmbeddedCodeService) {
  }

  public ngOnInit(): void {
    this._embeddedCodeService.getEmbeddedCode("support").subscribe(resp => {
      this.embeddedUrl1 = resp.data.length > 0 ? resp.data[0].embeddedUrl : "";
      this.embeddedUrl2 = resp.data.length > 1 ? resp.data[1].embeddedUrl : "";
      this.appendHtml('.container-support-iframe', this.embeddedUrl1);
      this.appendHtml('.container-faq-iframe', this.embeddedUrl2);
    });
  }

  ngAfterViewInit() {
    // this.loadScript('.container-faq-iframe', "https://alythex.formstack.com/forms/js.php/fv_faq").then(() => {
    //   this.loadScript('.container-iframe', "https://alythex.formstack.com/forms/js.php/fv_support");
    // });
  }


  // let u = document.createElement('noscript');
  // u.innerText = '<a href="https://alythex.formstack.com/forms/fv_support" title="Online Form">Online Form - FV - Embedded Support</a>';
  // this._renderer2.appendChild(this.elementRef.nativeElement, u);

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
