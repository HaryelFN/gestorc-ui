import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'primeng/chart';
import { SharedModule } from '../shared/shared.module';
import { DashbordRoutingModule } from './dashbord-routing.module';

import { DashbordComponent } from './dashbord/dashbord.component';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,

    SharedModule,
    DashbordRoutingModule
  ],
  declarations: [DashbordComponent]
})
export class DashbordModule { }
