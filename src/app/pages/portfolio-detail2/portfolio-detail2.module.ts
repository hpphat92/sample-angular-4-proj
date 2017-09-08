import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { PortfolioDetail2 } from './portfolio-detail2.component';
import { routing } from './portfolio-detail2.routing';
import { PowerbiContainerComponent } from "app/pages/portfolio-detail2/components/powerbi-container";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    PortfolioDetail2,
    PowerbiContainerComponent
  ],
  providers: [
  ]
})
export class PortfolioDetail2Module {}
