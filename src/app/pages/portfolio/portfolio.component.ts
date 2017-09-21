import {
  AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2, ViewChild,
  ViewChildren
} from "@angular/core";
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";
import { AllServiceModalComponent } from "./all-services/all-services.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as _ from 'lodash';
import { Router } from "@angular/router";
import { NotSupportMobileModalComponent } from "../../shared/not-support-mobile/not-support-mobile.component";

@Component({
  selector: 'portfolio',
  styleUrls: ['./portfolio.scss'],
  templateUrl: './portfolio.html'
})
export class Portfolio implements AfterViewInit {
  public maxViewItem = 4;
  public firstServiceContainer = null;
  public sizePerService = 55 + 10;
  public items = [];
  public position = {
    position: 'top cursor'
  };

  @ViewChildren('listService') set content(list: any) {
    if (list && list.length) {
      this.firstServiceContainer = list.first.nativeElement.querySelector('.service-container');
      this.computeMaxViewServices();
      this.changeDetectorRef.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    this._http.get(`${AppConstant.domain}/w-api/portfolios`).map((json) => json.json()).subscribe((resp) => {
      this.items = _.sortBy((resp.data as any).companies, 'name');
      this.appendHtml((resp.data as any).embedCode);
    });
  }

  constructor(private _http: ExtendedHttpService,
              private _modalService: NgbModal,
              private elementRef: ElementRef,
              private _renderer2: Renderer2,
              private changeDetectorRef: ChangeDetectorRef,
              private _router: Router) {
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
    (iframeDoc as any).write('<style>iframe {border: 0; width: calc(100% - 1px); height: 100%;} body {margin: 0}</style>');
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

  public computeMaxViewServices() {
    if (this.firstServiceContainer) {
      let width = this.firstServiceContainer.offsetWidth;
      this.maxViewItem = Math.min(Math.floor(width / this.sizePerService) - 1, 4);
      if (this.maxViewItem < 0) {
        this.maxViewItem = 0;
      }
    }
  }

  public gotoCustomisationView(item) {
    if (/Mobi/.test(navigator.userAgent)) {
      // mobile!

      let modalRef = this._modalService.open(NotSupportMobileModalComponent);
      modalRef.result.then(data => {
      }, (err) => {
      });
    } else {
      // [routerLink]="item.id?['/app/customisation/'+item.id]:['']"
      this._router.navigate(['app', 'customisation', item.id]);
    }
  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    this.computeMaxViewServices();
  }
}
