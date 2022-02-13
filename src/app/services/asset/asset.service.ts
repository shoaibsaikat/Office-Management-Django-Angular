import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { User } from '../../shared/types/user';
import { Message } from '../../shared/types/message';
import { Common } from '../../shared/common';
import { Asset } from 'src/app/shared/types/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private common: Common = new Common(this.http);

  private baseUrl: string = this.common.getBaseUrl().concat('asset/');
  private myListUrl: string = this.baseUrl.concat('my_list/?page=1');
  private allListUrl: string = this.baseUrl.concat('list/?page=1');
  private addUrl: string = this.baseUrl.concat('add/');
  private pendingUrl: string = this.baseUrl.concat('my_pending_list/');
  private editUrl: string = this.baseUrl.concat('edit/');

  constructor(private http: HttpClient) { }

  getMyAssetList(): Observable<string> {
    return this.http.get<string>(this.myListUrl, this.common.getHttpHeader());
  }

  getAllAssetList(): Observable<string> {
    return this.http.get<string>(this.allListUrl, this.common.getHttpHeader());
  }

  getPendingAssetList(): Observable<string> {
    return this.http.get<string>(this.pendingUrl, this.common.getHttpHeader());
  }

  getAddInfo(): Observable<string> {
    return this.http.get<string>(this.addUrl, this.common.getHttpHeader());
  }

  getEditInfo(): Observable<string> {
    return this.http.get<string>(this.editUrl, this.common.getHttpHeader());
  }

}
