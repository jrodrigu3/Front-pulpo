import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule, routes } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';
import { CoreModule } from 'src/app/core/core.module';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ListVehiclesComponent } from './components/vehicles-list/list-vehicles.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VehiclesComponent,
    AddVehicleComponent,
    ListVehiclesComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    RouterModule.forChild(routes),
    CoreModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ]
})
export class vehiclesModule { }
