import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './components/profile-info';
import { ProfilePasswordComponent } from './components/password';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '', redirectTo: 'profile-info'
      },
      {
        path: 'profile-info',
        component: ProfileInfoComponent,
      },
      {
        path: 'profile-password',
        component: ProfilePasswordComponent
      }
    ]
  },
];

export const routing = RouterModule.forChild(routes);
