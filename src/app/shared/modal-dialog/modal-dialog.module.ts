import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalDialogComponent } from "./modal-dialog.component";
import { ModalDialogService } from "./modal-dialog.service";

@NgModule({
  imports: [],
  declarations: [ModalDialogComponent
  ],
  providers: [ModalDialogService],
  entryComponents: [
    ModalDialogComponent
  ]
})
export class ModalDialogModule {
}
