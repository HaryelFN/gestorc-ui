import { Component } from '@angular/core';

import { Router } from '../../node_modules/@angular/router';
import { AuthService } from './security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mobileMenuActive: boolean;

  constructor(
    private router: Router,
    private auth: AuthService) { }

  // ngOnInit() {
  //   if (this.auth.isAccessTokenInvalid) {
  //     this.router.navigate(['/signin']);
  //   }
  // }

  onMobileMenuButton(event) {
    this.mobileMenuActive = !this.mobileMenuActive;
    event.preventDefault();
  }

  hideMobileMenu(event) {
    this.mobileMenuActive = false;
    event.preventDefault();
  }

  exibindoSibeBar() {
    return this.router.url !== '/home' && this.router.url !== '/signin';
  }
}
