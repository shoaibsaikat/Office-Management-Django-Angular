import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Common } from '../../shared/common';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private common: Common = new Common(this.http);

  private baseUrl: string = this.common.getBaseUrl().concat('inventory/');
  private listUrl: string = this.baseUrl.concat('?page=1');
  private quickEditUrl: string = this.baseUrl.concat('quick_edit/');

  constructor(private http: HttpClient) { }

  getInventoryList(): Observable<string> {
    return this.http.get<string>(this.listUrl, this.common.getHttpHeader());
  }

  inventoryQuickUpdate(id: number, count: number): Observable<string> {
    return this.http.post<string>(this.quickEditUrl, {
      pk: id,
      amount: count,
    }, this.common.getHttpHeader());
  }

}
