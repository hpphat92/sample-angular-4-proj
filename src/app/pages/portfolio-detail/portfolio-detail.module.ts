import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { PortfolioDetail } from './portfolio-detail.component';
import { routing } from './portfolio-detail.routing';
import { PowerbiContainerComponent } from "app/pages/portfolio-detail/components/powerbi-container";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    PortfolioDetail,
    PowerbiContainerComponent
  ],
  providers: [
  ]
})
export class PortfolioDetailModule {}
