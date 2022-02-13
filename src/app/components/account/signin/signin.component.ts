import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AppComponent } from 'src/app/app.component';

import { AccountService } from '../../../services/account/account.service';

import { SignIn } from '../../../types/signin';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private appComponent: AppComponent, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    let logIn: SignIn = form.value;
    this.accountService.logIn(logIn).subscribe({
      next: (v) => {
        let user: User = v;
        this.appComponent.user.id = user.id;
        this.appComponent.user.username = user.username;
        this.appComponent.user.first_name = user.first_name;
        this.appComponent.user.last_name = user.last_name;
        this.appComponent.user.email = user.email;
        this.appComponent.user.manager_id = user.manager_id;
        this.appComponent.user.token = user.token;
        this.appComponent.saveCurrentUser();
        this.router.navigate(['']);
      }
    });
  }

}
