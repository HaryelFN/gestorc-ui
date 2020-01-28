import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from '../../../node_modules/primeng/components/tooltip/tooltip';

import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { FuncionariosListComponent } from './funcinarios-list/funcionarios-list.component';
import { FuncionarioNewComponent } from './funcinario-new/funcionario-new.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CpfCnpjPipe } from '../shared/pipes/cpf-cnpj.pipe';
import { FonePipe } from '../shared/pipes/fone.pipe';
import { FuncionarioRoutingModule } from './funcionario-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TableModule,
    ToastModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    MessageModule,
    ProgressSpinnerModule,
    TooltipModule,

    NgxViacepModule,

    SharedModule,
    FuncionarioRoutingModule
  ],
  providers: [
    CpfCnpjPipe,
    FonePipe
  ],
  declarations: [
    FuncionarioNewComponent,
    FuncionariosListComponent
  ]
})
export class FuncionariosModule { }
