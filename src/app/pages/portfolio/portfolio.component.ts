import { AfterViewInit, Component, ElementRef, Renderer2 } from "@angular/core";
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";
import { AllServiceModalComponent } from "./all-services/all-services.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'portfolio',
  styleUrls: ['./portfolio.scss'],
  templateUrl: './portfolio.html'
})
export class Portfolio implements AfterViewInit {

  public items = [];
  public position = {
    position: 'top cursor'
  };

  ngAfterViewInit(): void {
    this._http.get(`${AppConstant.domain}/w-api/portfolios`).map((json) => json.json()).subscribe((resp) => {
      this.items = (resp.data as any).companies;
      this.appendHtml((resp.data as any).embedCode);
      // this.appendHtml('<iframe src="https://feed.mikle.com/widget/v2/44162/"></iframe>');

    });
  }

  constructor(private _http: ExtendedHttpService,
              private _modalService: NgbModal,
              private elementRef: ElementRef,
              private _renderer2: Renderer2) {

  }

  private appendHtml(htmlString) {
    if (!htmlString) {
      return;
    }
    let iframe = document.createElement('iframe');
    iframe.setAttribute('style', 'width: 100%; height: 100%;display:block;');
    iframe.setAttribute('frameBorder', '0');
    this._renderer2.appendChild(this.elementRef.nativeElement.querySelector('.google-alert-panel'), iframe);

    let iframeDoc = iframe.contentDocument || iframe.contentWindow;
    if ((iframeDoc as any).document) {
      iframeDoc = (iframeDoc as any).document;
    }
    iframeDoc.open();
    (iframeDoc as any).write(htmlString);
    (iframeDoc as any).write('<style>iframe {border: 0; width: 100%; height: 100%;} body {margin: 0}</style>');
    iframeDoc.close();
    setTimeout(() => {
      (iframe as any).width = (iframeDoc as any).body.scrollWidth;
      (iframe as any).height = (iframeDoc as any).body.scrollHeight;
    }, 5000);

  }

  public viewAllServices(service) {
    let modalRef = this._modalService.open(AllServiceModalComponent);
    modalRef.componentInstance.serviceItem = service;
    modalRef.result.then(data => {
    }, (err) => {
    });
  }

}
