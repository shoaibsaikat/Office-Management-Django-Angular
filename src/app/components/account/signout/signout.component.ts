import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {
  constructor(private appComponent: AppComponent, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  signout(): void  {
    this.accountService.logOut().subscribe({
      next: (v) => {
        this.appComponent.setCurrentUser(this.appComponent.getEmptyUser());
      }, error: (e) => {
        console.error(e);
      }, complete: () => {
        console.info('logged out');
      }
    });
  }
}
