import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { routing } from "./pages.routing";
import { NgaModule } from "../theme/nga.module";
import { AppTranslationModule } from "../app.translation.module";

import { Pages } from "./pages.component";
import { SHARED_SERVICES } from "../shared/index";
import { UnAuthPageModule } from "./un-auth-page/un-auth-page.module";
import { AllServiceModalComponent } from "./portfolio/all-services/all-services.component";

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing, UnAuthPageModule],
  declarations: [Pages, AllServiceModalComponent
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ...SHARED_SERVICES
  ],
  entryComponents: [
    AllServiceModalComponent
  ]
})
export class PagesModule {
}
