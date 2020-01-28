import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

import { MenuItem } from '../../../../node_modules/primeng/components/common/menuitem';

import { AppComponent } from '../../app.component';
import { ErrorHandlerService } from '../error-handler.service';
import { LogoutService } from '../../security/logout.service';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopBarComponent implements OnInit {

  usuario: any;
  displayDialog: boolean;

  items: MenuItem[];

  constructor(
    public app: AppComponent,
    private auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.items = [{
      label: 'Usuário',
      items: [
        {
          label: 'Perfil', icon: 'fa fa-user', command: (event) => {
            this.exibirPerfil();
          }
        },
        {
          label: 'Sair', icon: 'fa fa-sign-out', command: (event) => {
            this.logout();
          }
        }
      ]
    }];
  }

  private exibirPerfil() {
    this.usuario = this.auth.jwtPayload;
    this.displayDialog = true;
  }

  private logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/signin']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onDialogHide() {
    this.usuario = null;
  }

  get displayConfig() {
    return this.router.url !== '/home' && this.router.url !== '/signin' && this.router.url !== '/signup';
  }

  get displaySignIn() {
    return this.router.url === '/home';
  }

  get link () {
    return localStorage.getItem('token') === null ? '/home' : '/dashbord';
  }
}
