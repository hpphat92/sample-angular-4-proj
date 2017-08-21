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
    path: 'forgot-password',
    loadChildren: 'app/pages/forgotpassword/forgotpassword.module#ForgotPasswordModule',
  },
  {
    path: 'reset-password/:token',
    loadChildren: 'app/pages/resetpassword/resetpassword.module#ResetPasswordModule',
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
