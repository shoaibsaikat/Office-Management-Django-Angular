import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Common } from '../../shared/common';
import { Leave } from 'src/app/shared/types/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private common: Common = new Common(this.http);

  private currentLeave: Leave = this.getEmptyLeave();

  private baseUrl: string = this.common.getBaseUrl().concat('leave/');
  private createUrl: string = this.baseUrl.concat('create/');
  private myListUrl: string = this.baseUrl.concat('my_list/');
  private requestListUrl: string = this.baseUrl.concat('request_list/');
  private leaveSummaryUrl: string = this.baseUrl.concat('summary/');
  private approvalUrl: string = this.baseUrl.concat('approve/');

  constructor(private http: HttpClient) { }

  getMyLeaveList(page: number = 1): Observable<string> {
    let myListUrl = this.myListUrl.concat('?page=' + page);
    return this.http.get<string>(myListUrl, this.common.getHttpHeader());
  }

  getRequestLeaveList(page: number = 1): Observable<string> {
    let requestListUrl = this.requestListUrl.concat('?page=' + page);
    return this.http.get<string>(requestListUrl, this.common.getHttpHeader());
  }

  getLeaveSummaryList(year: number, page: number = 1): Observable<string> {
    let leaveSummaryYearUrl = this.leaveSummaryUrl.concat(year + '/?page=' + page);
    return this.http.get<string>(leaveSummaryYearUrl, this.common.getHttpHeader());
  }

  getCurrentLeave(): Leave {
    return this.currentLeave;
  }

  setCurrentLeave(leave: Leave): void {
    this.currentLeave = leave;
  }

  getEmptyLeave(): Leave {
    return {
      id: 0,
      title: '',
      start_date: '',
      end_date: '',
      approve_date: '',
      approver: 0,
      approved: false,
      comment: '',
      creation_date: '',
      day_count: 0,
      user: 0,
      user_first_name: '',
      user_last_name: '',
    }
  }

  getLeaveCreationData(): Observable<string> {
    return this.http.get<string>(this.createUrl, this.common.getHttpHeader());
  }

  createLeave(leave: any): Observable<string> {
    return this.http.post<string>(this.createUrl, {
      title: leave.title,
      start: leave.start,
      end: leave.end,
      days: leave.days,
      comment: leave.comment,
    }, this.common.getHttpHeader());
  }

  approveLeave(id: number): Observable<string> {
    let approvalUrl = this.approvalUrl.concat(id + '/');
    return this.http.post<string>(approvalUrl, null, this.common.getHttpHeader());
  }
}
