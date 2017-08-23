import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Profile } from './profile.component';
import { routing } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    ReactiveFormsModule
  ],
  declarations: [
    Profile
  ],
  providers: [
  ]
})
export class ProfileModule {}
