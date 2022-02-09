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
    };
  }

  saveEmptyUser(): void {
    this.user.id = -1;
    this.user.username = '';
    this.user.first_name = '';
    this.user.last_name = '';
    this.user.email = undefined;
    this.user.manager_id = undefined;
    this.user.token = undefined;
    this.saveCurrentUser();
    console.log('AppComponent: ' + this.user.id + ' : ' + this.user.username);
  }

  saveCurrentUser(): void {
    if (this.user) {
      localStorage.setItem('user_id', this.user.id.toString());
      localStorage.setItem('username', this.user.username);
      localStorage.setItem('first_name', this.user.first_name);
      localStorage.setItem('last_name', this.user.last_name);
      localStorage.setItem('token', this.user?.token ? this.user.token : '');
    } else {
      localStorage.setItem('token', '');
    }
    console.log('AppComponent: ' + this.user.id + ' : ' + this.user.username);
  }

  static getHttpHeader() {
    return {
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })}
  }
}
