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
  private myRequisitionUrl: string = this.baseUrl.concat('my_list/');
  private detailUrl: string = this.baseUrl.concat('detail/');
  private createUrl: string = this.baseUrl.concat('create/');

  constructor(private http: HttpClient) { }

  getHistory(): Observable<string> {
    return this.http.get<string>(this.historyUrl, this.common.getHttpHeader());
  }

  getMyRequisitionList(): Observable<string> {
    return this.http.get<string>(this.myRequisitionUrl, this.common.getHttpHeader());
  }

  getDetail(item: number): Observable<string> {
    let detailItemUrl: string = this.detailUrl.concat(item + '/');
    return this.http.get<string>(detailItemUrl, this.common.getHttpHeader());
  }

  getAddInfo(): Observable<string> {
    return this.http.get<string>(this.createUrl, this.common.getHttpHeader());
  }

  createRequisition(title: string, inventory: number, approver: number, amount: number, comment: string): Observable<string> {
    console.log(title + ":" + inventory + ":" + approver + ":" + amount + ":" + comment);
    return this.http.post<string>(this.createUrl, {
      title: title,
      inventory: inventory,
      approver: approver,
      amount: amount,
      comment: comment,
    }, this.common.getHttpHeader());
  }
}
