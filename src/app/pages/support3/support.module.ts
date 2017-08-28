import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Support } from './support.component';
import { routing } from './support.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    Support
  ],
  providers: [
  ]
})
export class SupportModule {}
