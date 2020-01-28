import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotComponent } from './forgot/forgot.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'forgot', component: ForgotComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
