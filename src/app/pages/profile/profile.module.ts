import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './components/profile-info';
import { ProfilePasswordComponent } from './components/password';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    AppTranslationModule
  ],
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfilePasswordComponent
  ],
  providers: [
  ],
})
export class ProfileModule {
}
