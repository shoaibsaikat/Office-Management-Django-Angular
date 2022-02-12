import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppComponent } from 'src/app/app.component';

import { AccountService } from 'src/app/services/account/account.service';

import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User = this.appComponent.user;
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, ]),
    lastName: new FormControl('', [Validators.required, ]),
    email: new FormControl('', [Validators.email, ]),
  });
  // get is not mandatory, it's for less code, if get is not added in that case from html we can get FormControl by using, profileForm.get('')
  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }

  constructor(private appComponent: AppComponent, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.firstName?.setValue(this.user.first_name);
    this.lastName?.setValue(this.user.last_name);
    this.email?.setValue(this.user.email);
  }

  onSubmit(): void {
    if (this.firstName?.errors || this.lastName?.errors || this.email?.errors) {
      return;
    }

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
