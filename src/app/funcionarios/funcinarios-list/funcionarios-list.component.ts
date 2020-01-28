import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { FuncionarioFilter, FuncionariosService } from '../funcionarios.service';
import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { CpfCnpjPipe } from 'src/app/shared/pipes/cpf-cnpj.pipe';
import { FonePipe } from 'src/app/shared/pipes/fone.pipe';

@Component({
  selector: 'app-funcionarios-list',
  templateUrl: './funcionarios-list.component.html'
})
export class FuncionariosListComponent implements OnInit {

  cols: any[];
  records = [];
  totalRecords = 0;
  loading: boolean;
  filter = new FuncionarioFilter();

  constructor(
    public auth: AuthService,
    private service: FuncionariosService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private pipeCpfCnpj: CpfCnpjPipe,
    private pipeFone: FonePipe
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'cpf', header: 'CPF', type: this.pipeCpfCnpj },
      { field: 'nome', header: 'Nome' },
      { field: 'telefone', header: 'Telefone', type: this.pipeFone, arg1: 'BR' },
      // { field: 'ativo', header: 'Status' }
    ];
    this.getAll();
  }

  getAll(page = 0) {
    this.loading = true;
    this.filter.page = page;
    this.filter.size = 8;
    this.filter.sort = 'nome';
    this.filter.order = 'asc';

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
      message: `Excluir ${obj.nome}?`,
      accept: () => {
        this.delete(obj.id);
      }
    });
  }

  private delete(id: number) {
    this.service.delete(id).then(() => {
      this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Funcionário excluído.' });
      this.getAll();
    }).catch(erro => this.errorHandler.handle(erro));
  }
}
