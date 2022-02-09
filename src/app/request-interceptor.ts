import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap({
          // Operation failed; error is an HttpErrorResponse
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              console.log('RequestInterceptor: ' +  error.message);
              if (error.status === 406) {
                // TODO: show message detail
              }
            }
          }
        }),
      );
  }
}