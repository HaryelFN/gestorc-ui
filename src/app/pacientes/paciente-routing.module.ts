import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../security/auth.guard';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacienteNewComponent } from './paciente-new/paciente-new.component';

const routes: Routes = [
  {
    path: '',
    component: PacientesListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FIND_PACIENTE'] }
  },
  {
    path: 'novo',
    component: PacienteNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADD_PACIENTE'] }
  },
  {
    path: ':id',
    component: PacienteNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADD_PACIENTE'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
