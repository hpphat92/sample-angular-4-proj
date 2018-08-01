import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Signup } from './signup.component';
import { TermAndConditionsComponent } from './terms-conditions';
import { routing } from './signup.routing';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    NgaModule,
    routing
  ],
  declarations: [
    Signup,
    TermAndConditionsComponent
  ],
  entryComponents: [
    TermAndConditionsComponent
  ]
})
export class SignupModule {}
