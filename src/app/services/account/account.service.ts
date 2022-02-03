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

  constructor(private http: HttpClient) { }

  logIn(user: SignIn): Observable<User> {
    var formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password1);

    return this.http.post<User>(this.logInUrl, formData).pipe(
      // tap(_ => this.log('logging...')),
      catchError(this.handleError<User>('log in'))
    );
  }

  logOut(): Observable<Message> {
    // TODO: it's generating two calls, need to check why
    // [03/Feb/2022 21:46:07] "GET /user/signout/ HTTP/1.1" 302 0
    // Not Found: /accounts/login/
    // [03/Feb/2022 21:46:07] "GET /accounts/login/?next=/user/signout/ HTTP/1.1" 404 2442

    return this.http.get<Message>(this.logOutUrl).pipe(
      // tap(_ => this.log('logging out...')),
      catchError(this.handleError<Message>('log out'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(message);
  }
}
