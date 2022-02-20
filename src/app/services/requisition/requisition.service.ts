import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Common } from '../../shared/common';
import { Inventory } from 'src/app/shared/types/inventory';
import { Requisition } from 'src/app/shared/types/requisition';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  private common: Common = new Common(this.http);

  private baseUrl: string = this.common.getBaseUrl().concat('inventory/requisition/');
  private historyUrl: string = this.baseUrl.concat('history/');

  constructor(private http: HttpClient) { }

  getHistory(): Observable<string> {
    return this.http.get<string>(this.historyUrl, this.common.getHttpHeader());
  }
}
