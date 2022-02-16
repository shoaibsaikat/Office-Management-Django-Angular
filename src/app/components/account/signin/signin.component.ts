import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppComponent } from 'src/app/app.component';

import { AccountService } from '../../../services/account/account.service';

import { SignIn } from '../../../shared/types/signin';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private appComponent: AppComponent, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    let logIn: SignIn = form.value;
    this.accountService.logIn(logIn).subscribe({
      next: (v) => {
        let user: User = v;
        this.appComponent.setCurrentUser(user);
        this.appComponent.saveCurrentUser();
        this.appComponent.navigate('');
      }
    });
  }

}
