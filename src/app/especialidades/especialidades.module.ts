import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from '../../../node_modules/primeng/components/tooltip/tooltip';

import { EspecialidadeNewComponent } from './especialidade-new/especialidade-new.component';
import { EspecialidadesListComponent } from './especialidades-list/especialidades-list.component';
import { EspecialidadeRoutingModule } from './especialidade-routing.module';
import { SharedModule } from '../shared/shared.module';

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
    MessageModule,
    ProgressSpinnerModule,
    TooltipModule,

    SharedModule,
    EspecialidadeRoutingModule
  ],
  declarations: [
    EspecialidadeNewComponent,
    EspecialidadesListComponent
  ]
})
export class EspecialidadesModule { }
