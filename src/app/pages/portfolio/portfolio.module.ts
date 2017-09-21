import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppTranslationModule } from "../../app.translation.module";
import { NgaModule } from "../../theme/nga.module";

import { Portfolio } from "./portfolio.component";
import { routing } from "./portfolio.routing";
import { Ng2TooltipOverlayModule } from "ng2-tooltip-overlay";
import { ModalDialogModule } from "../../shared/modal-dialog/modal-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    Ng2TooltipOverlayModule,
    routing,
    ModalDialogModule
  ],
  declarations: [
    Portfolio,
  ],
  providers: [
  ],
})
export class PortfolioModule {}
