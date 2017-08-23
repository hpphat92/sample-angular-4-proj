import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PowerbiContainerComponent } from './powerbi-container.component';
import { routing } from './powerbi-container.routing';
import { AppTranslationModule } from "../../../../app.translation.module";
import { NgaModule } from "../../../../theme/nga.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    PowerbiContainerComponent
  ],
  providers: [
  ]
})
export class PowerbiContainerModule {}
