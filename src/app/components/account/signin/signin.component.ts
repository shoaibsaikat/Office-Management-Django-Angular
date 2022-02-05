import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AppComponent } from 'src/app/app.component';

import { AccountService } from '../../../services/account/account.service';

import { SignIn } from '../../../types/signin';

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
    var logIn: SignIn = form.value;
    this.accountService.logIn(logIn).subscribe({
      next: (v) => {
        this.appComponent.setCurrentUser(v);
        this.router.navigate(['']);
      }, error: (e) => {
        console.error(e);
      }, complete: () => {
        console.info('logged in');
      }
    });
  }
}
