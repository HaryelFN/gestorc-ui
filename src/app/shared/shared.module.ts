import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { FonePipe } from './pipes/fone.pipe';
import { NumberPipe } from './pipes/number.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe.';
import { DisableControlDirective } from './disable-control.directive';
import { SummaryPipe } from './pipes/summary.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CpfCnpjPipe,
    FonePipe,
    NumberPipe,
    CapitalizePipe,
    SummaryPipe,
    DisableControlDirective
  ],
  exports: [
    CpfCnpjPipe,
    FonePipe,
    NumberPipe,
    CapitalizePipe,
    SummaryPipe,
    DisableControlDirective
  ]
})
export class SharedModule { }
