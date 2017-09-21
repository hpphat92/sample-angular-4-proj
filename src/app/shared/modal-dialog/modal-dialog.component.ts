import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";


@Component({
  selector: 'modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalDialogComponent implements OnInit {
  public title: any;
  public content: any;

  constructor(private activeModal: NgbActiveModal, private _router: Router) {
  }

  public ngOnInit(): void {
  }

  public close(): void {
    this.activeModal.dismiss();
  }
}
