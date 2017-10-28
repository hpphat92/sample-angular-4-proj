import {
  Injectable,
  EventEmitter
} from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDialogComponent } from "./modal-dialog.component";

@Injectable()
export class ModalDialogService {
  constructor(private _modalService: NgbModal) {
  }

  open(title, content) {
    let modalRef = this._modalService.open(ModalDialogComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    return modalRef.result;
  }
}
