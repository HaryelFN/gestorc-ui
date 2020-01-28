import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SideBarComponent {

  constructor(public app: AppComponent, public auth: AuthService) { }
}
