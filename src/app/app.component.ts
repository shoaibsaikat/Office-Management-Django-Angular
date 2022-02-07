import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Office Management';
  user: User = this.getEmptyUser();

  timeLeft: number = 60;

  constructor() {}

  ngOnInit(): void {
    this.user.id = Number(localStorage.getItem('user_id')) || -1;
    this.user.username = localStorage.getItem('username') || '';
    this.user.first_name = localStorage.getItem('first_name') || '';
    this.user.last_name = localStorage.getItem('last_name') || '';
    this.user.token = localStorage.getItem('token') || undefined;
  }

  getEmptyUser() {
    return {
      id: -1,
      first_name: '',
      last_name: '',
      username: '',
    }
  }

  setCurrentUser(user: User): void {
    this.user = user;
    if (this.user) {
      localStorage.setItem('user_id', this.user.id.toString());
      localStorage.setItem('username', this.user.username);
      localStorage.setItem('first_name', this.user.first_name);
      localStorage.setItem('last_name', this.user.last_name);
      localStorage.setItem('token', this.user?.token ? this.user.token : '');
    } else {
      localStorage.setItem('token', '');
    }
    console.log(this.user);
  }

  static getHttpHeader() {
    return {
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })}
  }
}
