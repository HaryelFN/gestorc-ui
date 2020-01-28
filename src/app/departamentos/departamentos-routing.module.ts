import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../security/auth.guard';
import { DepartamentosListComponent } from './departamentos-list/departamentos-list.component';
import { DepartamentoNewComponent } from './departamento-new/departamento-new.component';

const routes: Routes = [
  {
    path: '',
    component: DepartamentosListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FIND_DEPARTAMENTO'] }
  },
  {
    path: 'novo',
    component: DepartamentoNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADD_DEPARTAMENTO'] }
  },
  {
    path: ':id',
    component: DepartamentoNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADD_DEPARTAMENTO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
