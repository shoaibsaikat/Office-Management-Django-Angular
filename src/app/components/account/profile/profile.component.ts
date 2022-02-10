import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { AppComponent } from 'src/app/app.component';

import { AccountService } from 'src/app/services/account/account.service';

import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user?:User;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private appComponent: AppComponent, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.appComponent.user;
    this.profileForm.controls.firstName.setValue(this.user.first_name);
    this.profileForm.controls.lastName.setValue(this.user.last_name);
    this.profileForm.controls.email.setValue(this.user.email);
  }

  onSubmit(): void {
    let user = {
      'id': 0,
      'username': '',
      'first_name': this.profileForm.value.firstName,
      'last_name': this.profileForm.value.lastName,
      'email': this.profileForm.value.email,
    }

    this.accountService.changeInfo(user).subscribe(data =>  {
      console.log('ProfileComponent: ' + data.detail);
      this.appComponent.user.first_name = user.first_name;
      this.appComponent.user.last_name = user.last_name;
      this.appComponent.user.email = user.email;
      this.appComponent.saveCurrentUser();
      this.router.navigate(['']);
    });
  }
}
