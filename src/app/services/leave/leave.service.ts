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
  private leaveSummaryUrl: string = this.baseUrl.concat('summary/2021/');

  constructor(private http: HttpClient) { }

  getMyLeaveList(): Observable<string> {
    return this.http.get<string>(this.myListUrl, this.common.getHttpHeader());
  }

  getRequestLeaveList(): Observable<string> {
    return this.http.get<string>(this.requestListUrl, this.common.getHttpHeader());
  }

  getLeaveSummaryList(): Observable<string> {
    return this.http.get<string>(this.leaveSummaryUrl, this.common.getHttpHeader());
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
}
