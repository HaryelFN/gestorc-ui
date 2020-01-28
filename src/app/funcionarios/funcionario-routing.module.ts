import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../security/auth.guard';
import { FuncionariosListComponent } from './funcinarios-list/funcionarios-list.component';
import { FuncionarioNewComponent } from './funcinario-new/funcionario-new.component';

const routes: Routes = [
  {
    path: '',
    component: FuncionariosListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FIND_FUNCIONARIO'] }
  },
  {
    path: 'novo',
    component: FuncionarioNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADD_FUNCIONARIO'] }
  },
  {
    path: ':id',
    component: FuncionarioNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADD_FUNCIONARIO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
