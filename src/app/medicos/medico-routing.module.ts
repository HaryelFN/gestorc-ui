import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../security/auth.guard';
import { MedicosListComponent } from './medicos-list/medicos-list.component';
import { MedicoNewComponent } from './medico-new/medico-new.component';

const routes: Routes = [
  {
    path: '',
    component: MedicosListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FIND_MEDICO'] }
  },
  {
    path: 'novo',
    component: MedicoNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADD_MEDICO'] }
  },
  {
    path: ':id',
    component: MedicoNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADD_MEDICO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
