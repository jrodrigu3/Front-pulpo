import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';

const routes: Routes = [
  {
    path: '', component: BaseComponent,
    children: [
      {
        path: 'vehicles',
        loadChildren: () => import('../processes/vehicles/vehicles.module').then(m => m.vehiclesModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
