import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AppComponent } from 'src/app/app.component';

import { AccountService } from '../../../services/account/account.service';

import { Message } from 'src/app/types/message';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  passwordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword1: new FormControl('', Validators.required),
    newPassword2: new FormControl('', Validators.required),
  });

  constructor(private appComponent: AppComponent, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.accountService.setPassword(this.passwordForm.value.oldPassword, this.passwordForm.value.newPassword1).subscribe(data =>  {
      // console.log('PasswordComponent: ' + data.detail);
      this.router.navigate(['']);
    });
  }

}
