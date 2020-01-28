import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../security/auth.guard';
import { EspecialidadesListComponent } from './especialidades-list/especialidades-list.component';
import { EspecialidadeNewComponent } from './especialidade-new/especialidade-new.component';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadesListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_FIND_ESPECIALIDADE'] }
  },
  {
    path: 'novo',
    component: EspecialidadeNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADD_ESPECIALIDADE'] }
  },
  {
    path: ':id',
    component: EspecialidadeNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADD_ESPECIALIDADE'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EspecialidadeRoutingModule { }
