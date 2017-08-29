import { Component } from "@angular/core";
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
              private _modalService: NgbModal) {
    this._http.get(`${AppConstant.domain}/w-api/portfolios`).map((json) => json.json()).subscribe((resp) => {
      this.items = resp.data;
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
