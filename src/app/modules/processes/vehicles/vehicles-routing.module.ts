import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehiclesComponent } from './vehicles.component';


export const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
  },
  {
    path: 'add',
    component: AddVehicleComponent,
  },
  {
    path: 'edit/:id',
    component: AddVehicleComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
