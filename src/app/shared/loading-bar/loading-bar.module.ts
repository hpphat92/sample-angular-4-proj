import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { LoadingBar } from './loading-bar.component';
import { LoadingBarService } from "./loading-bar.service";


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
  ],
  declarations: [
    LoadingBar,
  ],
  exports: [
    LoadingBar
  ],
  providers: [LoadingBarService]
})
export class LoadingBarModule {
}
