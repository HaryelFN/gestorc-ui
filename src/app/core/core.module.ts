import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenuModule } from '../../../node_modules/primeng/components/menu/menu';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { ErrorHandlerService } from './error-handler.service';
import { MyHttp } from '../security/my-http';
import { TopBarComponent } from './topbar/topbar.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../security/auth.service';

import { PessoaService } from '../shared/pessoa.service';
import { DepartamentoService } from '../departamentos/departamento.service';
import { AcaoService } from '../acoes/acao.service';
import { FuncionariosService } from '../funcionarios/funcionarios.service';
import { EspecialidadeService } from '../especialidades/especialidades.service';
import { MedicoService } from '../medicos/medico.service';
import { PacienteService } from '../pacientes/paciente.service';
import { ProntuarioService } from '../prontuarios/prontuario.service';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,

    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    DialogModule,
    MenuModule
  ],
  declarations: [
    TopBarComponent,
    SideBarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    TopBarComponent,
    SideBarComponent
  ],
  providers: [
    PessoaService,

    AcaoService,
    DepartamentoService,
    FuncionariosService,

    EspecialidadeService,
    MedicoService,

    PacienteService,
    ProntuarioService,

    ErrorHandlerService,
    AuthService,
    MyHttp,

    ConfirmationService,
    MessageService,
    JwtHelperService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
