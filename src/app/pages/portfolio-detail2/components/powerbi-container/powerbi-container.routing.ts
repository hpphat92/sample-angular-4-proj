import { Routes, RouterModule } from '@angular/router';

import { PowerbiContainerComponent } from './powerbi-container.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PowerbiContainerComponent,
    children: [
      // { path: 'treeview', component: TreeViewComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
