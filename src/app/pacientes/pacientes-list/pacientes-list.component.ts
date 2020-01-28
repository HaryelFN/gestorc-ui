import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { PacienteService, PacienteFilter } from '../paciente.service';
import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { CpfCnpjPipe } from 'src/app/shared/pipes/cpf-cnpj.pipe';
import { FonePipe } from 'src/app/shared/pipes/fone.pipe';
import { ProntuarioService } from 'src/app/prontuarios/prontuario.service';
import { Prontuario } from 'src/app/shared/models';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html'
})
export class PacientesListComponent implements OnInit {

  cols: any[];
  records = [];
  totalRecords = 0;
  loading: boolean;
  filter = new PacienteFilter();

  displayProntuario = false;
  prontuarios: Prontuario[];

  constructor(
    public auth: AuthService,
    private service: PacienteService,
    private prontuarioService: ProntuarioService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.filter.sort = 'nome';
    this.filter.order = 'asc';

    this.getAll();
  }

  onOpenProntuarios(obj: any) {
    this.prontuarioService.findByPacienteId(obj.id).then(list => {
      this.prontuarios = list;
      this.displayProntuario = true;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  onCloseDisplayProntuario() {
    this.prontuarios = [];
    this.displayProntuario = false;
  }

  onOpenConsultas(obj: any) {

  }

  getAll(page = 0) {
    this.loading = true;
    this.filter.page = page;
    this.service.getPageable(this.filter).then(result => {
      this.totalRecords = result.total;
      this.records = result.objs;
      console.log(this.records);
      this.loading = false;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  nextPage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.getAll(page);
  }
}
