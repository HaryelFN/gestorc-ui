import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { SharedModule } from 'src/app/shared/shared.module';
import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosListComponent } from './departamentos-list/departamentos-list.component';
import { DepartamentoNewComponent } from './departamento-new/departamento-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    AccordionModule,
    CheckboxModule,
    DialogModule,
    TabViewModule,
    MessagesModule,
    MessageModule,

    SharedModule,
    DepartamentosRoutingModule
  ],
  declarations: [
    DepartamentosListComponent,
    DepartamentoNewComponent
  ]
})
export class DepartamentosModule { }
