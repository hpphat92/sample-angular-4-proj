import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { ServicesList } from './services-list.component';
import { routing } from './services-list.routing';
import { Ng2TooltipOverlayModule } from "ng2-tooltip-overlay";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    Ng2TooltipOverlayModule,
    routing
  ],
  declarations: [
    ServicesList
  ],
  providers: [
  ]
})
export class ServicesListModule {}
