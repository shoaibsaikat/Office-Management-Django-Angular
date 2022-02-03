import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  signout(): void  {
    this.accountService.logOut().subscribe({
      next: (v) => console.log(v),
      // complete: () => console.info('logged out')
    });
  }
}
