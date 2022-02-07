import { Component } from '@angular/core';

import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Office Management';
  user?: User; 

  constructor() {}

  ngOnInit(): void {
  }

  setCurrentUser(user?: User): void {
    this.user = user;
    console.log(this.user);
  }
}
