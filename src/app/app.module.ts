import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { SHARED_SERVICES } from './shared/services';
import { AuthGuard } from './shared/guard/auth.guard';
import { ExtendedHttpService } from "./shared/services/http/http.service";
import { LoadingBarModule } from "./shared/loading-bar/loading-bar.module";

//noinspection TypeScriptCheckImport
// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  ...SHARED_SERVICES,
  AuthGuard
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    ToastrModule.forRoot(),
    ToastContainerModule.forRoot(),
    PagesModule,
    LoadingBarModule,
    routing
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    ExtendedHttpService,
    ...SHARED_SERVICES
  ]
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
