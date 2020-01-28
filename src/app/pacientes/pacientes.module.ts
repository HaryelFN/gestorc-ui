import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from '../../../node_modules/primeng/components/tooltip/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';

import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { SharedModule } from 'src/app/shared/shared.module';
import { CpfCnpjPipe } from '../shared/pipes/cpf-cnpj.pipe';
import { FonePipe } from '../shared/pipes/fone.pipe';
import { PacienteRoutingModule } from './paciente-routing.module';

import { PacienteNewComponent } from './paciente-new/paciente-new.component';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';

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
    DropdownModule,
    CalendarModule,
    MessageModule,
    ProgressSpinnerModule,
    TooltipModule,
    FieldsetModule,
    DialogModule,

    NgxViacepModule,

    SharedModule,
    PacienteRoutingModule
  ],
  providers: [
    CpfCnpjPipe,
    FonePipe
  ],
  declarations: [
    PacienteNewComponent,
    PacientesListComponent
  ]
})
export class PacientesModule { }
