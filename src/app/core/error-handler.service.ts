import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotAuthenticatedError } from '../security/my-http';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse.error.detail === 'string') {
      msg = errorResponse.error.detail;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/signup']);

    } else
      if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {

        msg = 'Ocorreu um erro ao processar a sua solicitação';

        if (errorResponse.status === 403) {
          msg = 'Você não tem permissão para executar esta ação';
        }

        try {
          msg = errorResponse.error[0].mesageUser;
        } catch (e) { }

        console.error('Ocorreu um erro', errorResponse);

      } else {
        msg = 'Erro ao processar serviço remoto. Tente novamente.';
        console.error('Ocorreu um erro', errorResponse);
      }

    this.messageService.add({ key: 'toast', severity: 'error', summary: 'Error', detail: msg });
  }

}
