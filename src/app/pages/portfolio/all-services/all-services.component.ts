import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";


@Component({
  selector: 'all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllServiceModalComponent implements OnInit {
  public serviceItem: any;

  constructor(private activeModal: NgbActiveModal, private _router: Router) {
  }

  public ngOnInit(): void {
  }

  public close(): void {
    this.activeModal.dismiss();
  }

  public gotoService(service): void {
    this.close();
    this._router.navigate(['app', 'portfolio-detail', service.mappingId]);
  }

}
