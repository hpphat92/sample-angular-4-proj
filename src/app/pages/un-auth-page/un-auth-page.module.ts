import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgaModule } from '../../theme/nga.module';
import { AppTranslationModule } from '../../app.translation.module';

import { UnAuthPage } from './un-auth-page.component';
import { SHARED_SERVICES } from "../../shared/index";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, RouterModule],
  declarations: [UnAuthPage],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ...SHARED_SERVICES
  ]
})
export class UnAuthPageModule {
}
