import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  onLogin(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/pacientes']);
      })
      .catch(erro => {
        console.log('error', erro);
        this.errorHandler.handle(erro);
      });
  }

}
