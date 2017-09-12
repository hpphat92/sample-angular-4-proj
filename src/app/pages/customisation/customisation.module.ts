import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Customisation } from './customisation.component';
import { routing } from './customisation.routing';
import { SelectModule } from "ng2-select";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    SelectModule,
    routing
  ],
  declarations: [
    Customisation,
  ],
  providers: [
  ]
})
export class CustomisationModule {}
