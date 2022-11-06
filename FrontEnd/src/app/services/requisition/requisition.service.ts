import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Common } from '../../shared/common';
import { User } from 'src/app/shared/types/user';
import { Requisition } from 'src/app/shared/types/requisition';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  private common: Common = new Common(this.http);

  private currentRequisition: Requisition = {
    id: 0,
    amount: 0,
    approver: 0,
    approver_name: '',
    date: '',
    item_name: '',
    title: '',
    total: 0,
    unit: '',
    user: 0,
    user_name: '',
  };
  private distributorList: User[] = [];

  private baseUrl: string = this.common.getBaseUrl().concat('inventory/requisition/');
  private historyUrl: string = this.baseUrl.concat('history/');
  private myRequisitionUrl: string = this.baseUrl.concat('my_list/');
  private detailUrl: string = this.baseUrl.concat('detail/');
  private createUrl: string = this.baseUrl.concat('create/');
  private approvalUrl: string = this.baseUrl.concat('approval/');
  private distributionUrl: string = this.baseUrl.concat('distribution/');

  constructor(private http: HttpClient) { }

  getHistory(page: number = 1): Observable<string> {
    let historyUrl = this.historyUrl.concat('?page=' + page);
    return this.http.get<string>(historyUrl, this.common.getHttpHeader());
  }

  getMyRequisitionList(page: number = 1): Observable<string> {
    let myRequisitionUrl = this.myRequisitionUrl.concat('?page=' + page);
    return this.http.get<string>(myRequisitionUrl, this.common.getHttpHeader());
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

  getApprovalList(page: number = 1): Observable<string> {
    let approvalUrl = this.approvalUrl.concat('?page=' + page);
    return this.http.get<string>(approvalUrl, this.common.getHttpHeader());
  }

  approve(id: number, distributor: number): Observable<string> {
    return this.http.post<string>(this.approvalUrl, {
      pk: id,
      distributor: distributor,
    }, this.common.getHttpHeader());
  }

  getDistributionList(page: number = 1): Observable<string> {
    let distributionUrl = this.distributionUrl.concat('?page=' + page);
    return this.http.get<string>(distributionUrl, this.common.getHttpHeader());
  }

  distribute(id: number): Observable<string> {
    return this.http.post<string>(this.distributionUrl, {
      pk: id,
    }, this.common.getHttpHeader());
  }

  setCurrentRequisition(item: Requisition): void {
    this.currentRequisition = item;
  }

  getCurrentRequisition(): Requisition {
    return this.currentRequisition;
  }

  setDistributorList(users: User[]): void {
    this.distributorList = users;
  }

  getDistributorList(): User[] {
    return this.distributorList;
  }
}
