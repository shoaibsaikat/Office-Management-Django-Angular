import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Message } from './types/message';

import { MessageService } from '../services/message/message.service';

@Injectable({
  providedIn: 'root',
})

export class RequestInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap({
          // Operation failed; error is an HttpErrorResponse
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              let msg: Message = JSON.parse(JSON.stringify(error.error));
              this.messageService.clearError();
              this.messageService.addError(msg.detail);
              // console.log('RequestInterceptor: ' +  msg.detail);
            }
          }
        }),
      );
  }

}