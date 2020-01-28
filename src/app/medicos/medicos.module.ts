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
import { CheckboxModule } from 'primeng/checkbox';

import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { SharedModule } from 'src/app/shared/shared.module';
import { CpfCnpjPipe } from '../shared/pipes/cpf-cnpj.pipe';
import { FonePipe } from '../shared/pipes/fone.pipe';

import { MedicoRoutingModule } from './medico-routing.module';
import { MedicosListComponent } from './medicos-list/medicos-list.component';
import { MedicoNewComponent } from './medico-new/medico-new.component';

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
    DropdownModule,
    MessageModule,
    ProgressSpinnerModule,
    TooltipModule,
    CheckboxModule,

    NgxViacepModule,

    SharedModule,
    MedicoRoutingModule
  ],
  providers: [
    CpfCnpjPipe,
    FonePipe
  ],
  declarations: [
    MedicosListComponent,
    MedicoNewComponent
  ]
})
export class MedicosModule { }
