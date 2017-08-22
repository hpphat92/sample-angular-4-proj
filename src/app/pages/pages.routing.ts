import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
  },
  {
    path: 'signup',
    loadChildren: 'app/pages/signup/signup.module#SignupModule',
  },
  {
    path: 'forgot-password',
    loadChildren: 'app/pages/forgotpassword/forgotpassword.module#ForgotPasswordModule',
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
      {path: 'submit-data', loadChildren: './submit-data/submit-data.module#SubmitDataModule'},
      {path: 'support', loadChildren: './support/support.module#SupportModule'},
    ],
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
