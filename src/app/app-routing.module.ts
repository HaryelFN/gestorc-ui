import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'dashbord', loadChildren: './dashbord/dashbord.module#DashbordModule' },

  { path: 'pacientes', loadChildren: './pacientes/pacientes.module#PacientesModule' },

  { path: 'especialidades', loadChildren: './especialidades/especialidades.module#EspecialidadesModule' },
  { path: 'medicos', loadChildren: './medicos/medicos.module#MedicosModule' },

  { path: 'funcionarios', loadChildren: './funcionarios/funcionarios.module#FuncionariosModule' },
  { path: 'departamentos', loadChildren: './departamentos/departamentos.module#DepartamentosModule' },

  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
