import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Common } from '../../shared/common';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private common: Common = new Common(this.http);

  private baseUrl: string = this.common.getBaseUrl().concat('leave/');
  private createUrl: string = this.baseUrl.concat('create/');

  constructor(private http: HttpClient) { }
}
