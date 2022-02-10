import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/account/signin/signin.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { ManagerComponent } from './components/account/manager/manager.component';
import { PasswordComponent } from './components/account/password/password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/signin', component: SigninComponent },
  { path: 'account/profile', component: ProfileComponent },
  { path: 'account/manager', component: ManagerComponent },
  { path: 'account/password', component: PasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
