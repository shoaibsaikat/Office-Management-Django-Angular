import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../../types/user';
import { SignIn } from '../../types/signin';
import { Message } from '../../types/message';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = 'http://127.0.0.1:8000/user/';
  private logInUrl: string = this.baseUrl.concat('signin/');
  private logOutUrl: string = this.baseUrl.concat('signout/');
  private profileUrl: string = this.baseUrl.concat('info/');

  constructor(private http: HttpClient) { }

  logIn(user: SignIn): Observable<User> {
    var formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password1);
    return this.http.post<User>(this.logInUrl, formData);
  }

  logOut(): Observable<Message> {
    return this.http.post<Message>(this.logOutUrl, null);
  }
}
