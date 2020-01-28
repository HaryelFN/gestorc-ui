import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { EspecialidadeService } from '../especialidades.service';

@Component({
  selector: 'app-especialidades-list',
  templateUrl: './especialidades-list.component.html'
})
export class EspecialidadesListComponent implements OnInit {

  records = [];
  loading: boolean;

  constructor(
    public auth: AuthService,
    private service: EspecialidadeService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.service.getAll().then(list => {
      this.records = list;
      this.loading = false;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  confirmDelete(obj) {
    this.confirmation.confirm({
      message: `Excluir especialidade ${obj.nome}?`,
      accept: () => {
        this.delete(obj.id);
      }
    });
  }

  private delete(id: number) {
    this.service.delete(id).then(() => {
      this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Especialidade excluída.' });
      this.getAll();
    }).catch(erro => this.errorHandler.handle(erro));
  }
}
