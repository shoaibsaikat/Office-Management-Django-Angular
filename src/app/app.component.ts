import { Component } from '@angular/core';

import { AccountService } from './services/account/account.service';

import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Office Management';
  user?: User; 

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    // TODO: need to keep user session
    this.accountService.getCurrentUser().subscribe({
      next: (v) => {
        this.user = v;
        console.log(v);
      }, error: (e) => {
        console.error(e);
      }, complete: () => {
        console.info('already logged in');
      }
    });
  }

  setCurrentUser(user?: User): void {
    this.user = user;
    console.log(this.user);
  }
}
