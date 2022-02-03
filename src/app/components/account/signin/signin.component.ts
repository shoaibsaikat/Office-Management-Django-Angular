import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AccountService } from '../../../services/account/account.service';

import { SignIn } from '../../../types/signin';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    var user: SignIn = form.value;
    this.accountService.logIn(user).subscribe({
      next: (v) => console.log(v),
      // error: (e) => console.error(e),
      // complete: () => console.info('logged in')
    });
  }

}
