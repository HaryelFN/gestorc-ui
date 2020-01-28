import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../security/auth.guard';
import { DashbordComponent } from './dashbord/dashbord.component';

const routes: Routes = [
  {
    path: '',
    component: DashbordComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FIND_PACIENTE'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
