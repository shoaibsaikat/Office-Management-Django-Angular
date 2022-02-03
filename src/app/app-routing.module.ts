import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/account/signin/signin.component';
import { SignoutComponent } from './components/account/signout/signout.component';

const routes: Routes = [
  { path: 'account/signin', component: SigninComponent },
  { path: 'account/signout', component: SignoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
