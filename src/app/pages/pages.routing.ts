import { RouterModule, Routes } from "@angular/router";
import { Pages } from "./pages.component";
import { ModuleWithProviders } from "@angular/core";
import { AnonymousPage } from "./../shared/services/auth-guard";
import { AuthorizedPage } from "../shared/services/auth-guard/auth-guard.service";
import { UnAuthPage } from "./un-auth-page/un-auth-page.component";

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'home',
    component: UnAuthPage,
    canActivateChild: [AnonymousPage],
    children: [
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
    ]
  },
  {
    path: 'app',
    component: Pages,
    canActivateChild: [AuthorizedPage],
    children: [
      { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
      { path: 'portfolio', loadChildren: './portfolio/portfolio.module#PortfolioModule' },
      { path: 'portfolio-detail/:id', loadChildren: './portfolio-detail/portfolio-detail.module#PortfolioDetailModule' },
      { path: 'portfolio-detail2/:id', loadChildren: './portfolio-detail2/portfolio-detail2.module#PortfolioDetail2Module' },
      { path: 'submit-data', loadChildren: './submit-data/submit-data.module#SubmitDataModule' },
      { path: 'test1', loadChildren: './test1/test1.module#Test1Module' },
      { path: 'support', loadChildren: './support/support.module#SupportModule' },
      { path: 'services', loadChildren: './services-list/services-list.module#ServicesListModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      { path: 'active-service', loadChildren: './active-service/active-service.module#ActiveServiceModule' },
      { path: 'inactive-service', loadChildren: './inactive-service/inactive-service.module#InactiveServiceModule' },
    ],
  },
  {
    path: '**',
    redirectTo: 'home/login'
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
