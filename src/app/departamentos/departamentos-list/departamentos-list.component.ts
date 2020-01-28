import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { DepartamentoService } from '../departamento.service';
import { Departamento } from 'src/app/shared/models';

@Component({
  selector: 'app-departamentos-list',
  templateUrl: './departamentos-list.component.html'
})
export class DepartamentosListComponent implements OnInit {

  titule: string;
  listObj: Departamento[];

  constructor(
    public auth: AuthService,
    private service: DepartamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService) { }

  ngOnInit() {
    this.titule = 'Departamento';
    this.getAll();
  }

  confirmDelete(obj: Departamento) {
    this.confirmation.confirm({
      message: `Excluir ${this.titule} ?`,
      accept: () => {
        this.delete(obj);
      }
    });
  }

  private getAll() {
    this.service.findAll()
      .then(resultado => {
        this.listObj = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private delete(obj: Departamento) {
    this.service.delete(obj.id)
      .then(() => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `${this.titule} excluido.` });
        this.getAll();
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }
}
