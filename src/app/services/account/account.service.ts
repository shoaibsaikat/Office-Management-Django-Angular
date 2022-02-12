import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AppComponent } from 'src/app/app.component';

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
  private profileUrl: string = this.baseUrl.concat('change_profile/');
  private managerUrl: string = this.baseUrl.concat('change_manager/');
  private passwordUrl: string = this.baseUrl.concat('chnage_password/');

  constructor(private http: HttpClient) { }

  logIn(user: SignIn): Observable<User> {
    var formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password1);
    return this.http.post<User>(this.logInUrl, formData);
  }

  logOut(): Observable<Message> {
    return this.http.post<Message>(this.logOutUrl, null, AppComponent.getHttpHeader());
  }

  changeInfo(user: User): Observable<Message> {
    return this.http.post<Message>(this.profileUrl, {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email || '',
    }, AppComponent.getHttpHeader());
  }

  getMangerList(): Observable<string> {
    return this.http.get<string>(this.managerUrl, AppComponent.getHttpHeader());
  }

  setManger(id: number): Observable<Message> {
    return this.http.post<Message>(this.managerUrl, {
      manager: id,
    }, AppComponent.getHttpHeader());
  }

  setPassword(last_pass: string, new_pass: string): Observable<Message> {
    return this.http.post<Message>(this.passwordUrl, {
      lastpassword: last_pass,
      newpassword: new_pass,
    }, AppComponent.getHttpHeader());
  }
}
