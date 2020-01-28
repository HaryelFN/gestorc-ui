import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { MedicoFilter, MedicoService } from '../medico.service';
import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.component.html'
})
export class MedicosListComponent implements OnInit {

  records = [];
  totalRecords = 0;
  loading: boolean;
  filter = new MedicoFilter();

  constructor(
    public auth: AuthService,
    private service: MedicoService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(page = 0) {
    this.loading = true;
    this.filter.page = page;
    this.filter.size = 8;
    this.filter.sort = 'nome';
    this.filter.order = 'ASC';
    this.service.getPageable(this.filter).then(result => {
      this.totalRecords = result.total;
      this.records = result.objs;
      this.loading = false;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  nextPage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.getAll(page);
  }

  confirmDelete(obj) {
    this.confirmation.confirm({
      message: `Excluir Dr(a). ${obj.nome}?`,
      accept: () => {
        this.delete(obj.id);
      }
    });
  }

  private delete(id: number) {
    this.service.delete(id).then(() => {
      this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Médico excluído.' });
      this.getAll();
    }).catch(erro => this.errorHandler.handle(erro));
  }

}
