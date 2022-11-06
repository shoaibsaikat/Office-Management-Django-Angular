import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Common } from '../../shared/common';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private common: Common = new Common(this.http);

  private baseUrl: string = this.common.getBaseUrl().concat('asset/');
  private myListUrl: string = this.baseUrl.concat('my_list/');
  private allListUrl: string = this.baseUrl.concat('list/');
  private addUrl: string = this.baseUrl.concat('add/');
  private pendingUrl: string = this.baseUrl.concat('my_pending_list/');
  private editUrl: string = this.baseUrl.concat('edit/');

  constructor(private http: HttpClient) { }

  getMyAssetList(page: number = 1): Observable<string> {
    let myListUrl = this.myListUrl.concat('?page=' + page);
    return this.http.get<string>(myListUrl, this.common.getHttpHeader());
  }

  getAllAssetList(page: number = 1): Observable<string> {
    let allListUrl = this.allListUrl.concat('?page=' + page);
    return this.http.get<string>(allListUrl, this.common.getHttpHeader());
  }

  getPendingAssetList(page: number = 1): Observable<string> {
    let pendingUrl = this.pendingUrl.concat('?page=' + page);
    return this.http.get<string>(pendingUrl, this.common.getHttpHeader());
  }

  declinePendingAsset(assetId: number): Observable<string> {
    return this.http.put<string>(this.pendingUrl, {
      pk: assetId,
    }, this.common.getHttpHeader());
  }

  approvePendingAsset(assetId: number): Observable<string> {
    return this.http.post<string>(this.pendingUrl, {
      pk: assetId,
    }, this.common.getHttpHeader());
  }

  getAddInfo(): Observable<string> {
    return this.http.get<string>(this.addUrl, this.common.getHttpHeader());
  }

  getEditInfo(item: number): Observable<string> {
    let editItemUrl: string = this.editUrl.concat(item + '/');
    return this.http.get<string>(editItemUrl, this.common.getHttpHeader());
  }

  createAsset(asset: any): Observable<string> {
    return this.http.post<string>(this.addUrl, {
      name: asset.name,
      model: asset.model,
      serial: asset.serial,
      purchaseDate: asset.purchaseDate,
      warranty: asset.warranty,
      status: asset.status,
      type: asset.type,
      description: asset.description,
    }, this.common.getHttpHeader());
  }

  assignAsset(assetId: number, userId: number): Observable<string> {
    return this.http.post<string>(this.myListUrl, {
      pk: assetId,
      assignee: userId,
    }, this.common.getHttpHeader());
  }

  updateAsset(asset: any): Observable<string> {
    let editItemUrl: string = this.editUrl.concat(asset.id + '/');
    return this.http.post<string>(editItemUrl, {
      name: asset.name,
      warranty: asset.warranty,
      status: asset.status,
      description: asset.description,
    }, this.common.getHttpHeader());
  }

}
