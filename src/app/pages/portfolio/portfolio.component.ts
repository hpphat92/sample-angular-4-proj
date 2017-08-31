import { Component, ElementRef, Renderer2 } from "@angular/core";
import { AppConstant } from "../../app.constant";
import { ExtendedHttpService } from "../../shared/services/http/http.service";
import { AllServiceModalComponent } from "./all-services/all-services.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'portfolio',
  styleUrls: ['./portfolio.scss'],
  templateUrl: './portfolio.html'
})
export class Portfolio {
  public items = [];
  public position = {
    position: 'top cursor'
  };

  constructor(private _http: ExtendedHttpService,
              private _modalService: NgbModal,
              private elementRef: ElementRef,
              private _renderer2: Renderer2) {
    this._http.get(`${AppConstant.domain}/w-api/portfolios`).map((json) => json.json()).subscribe((resp) => {
      this.items = resp.data;
    });
    if (typeof ((window as any).fg_widgets) === "undefined") {
      (window as any).fg_widgets = new Array();
    }
    (window as any).fg_widgets.push("fgid_183015e79f00b89d8312db3bf");
    this.loadScript("https://www.feedgrabbr.com/widget/fgwidget.js").then(() => {
      debugger;

    });
  }

  private loadScript(src) {
    return new Promise((resolve, reject) => {
      let s = document.createElement("script");
      s.type = "text/javascript";
      s.onload = (e) => {
        resolve();
      };
      s.src = src;
      this._renderer2.appendChild(this.elementRef.nativeElement, s);
    })

  }

  public viewAllServices(service) {
    let modalRef = this._modalService.open(AllServiceModalComponent);
    modalRef.componentInstance.serviceItem = service;
    modalRef.result.then(data => {
    }, (err) => {
    });
  }

}
