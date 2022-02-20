import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Common } from '../../shared/common';
import { Inventory } from 'src/app/shared/types/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private common: Common = new Common(this.http);

  private baseUrl: string = this.common.getBaseUrl().concat('inventory/');
  private listUrl: string = this.baseUrl.concat('?page=1');
  private quickEditUrl: string = this.baseUrl.concat('quick_edit/');
  private createUrl: string = this.baseUrl.concat('create/');
  private editUrl: string = this.baseUrl.concat('edit/');

  constructor(private http: HttpClient) { }

  getInventoryList(): Observable<string> {
    return this.http.get<string>(this.listUrl, this.common.getHttpHeader());
  }

  getEditInfo(item: number): Observable<string> {
    let editItemUrl: string = this.editUrl.concat(item + '/');
    return this.http.get<string>(editItemUrl, this.common.getHttpHeader());
  }

  createInventoryItem(item: Inventory): Observable<string> {
    return this.http.post<string>(this.createUrl, {
      name: item.name,
      description: item.description,
      unit: item.unit,
      count: item.count,
    }, this.common.getHttpHeader());
  }

  inventoryQuickUpdate(id: number, count: number): Observable<string> {
    return this.http.post<string>(this.quickEditUrl, {
      pk: id,
      amount: count,
    }, this.common.getHttpHeader());
  }

  updateInventory(item: Inventory): Observable<string> {
    let editItemUrl: string = this.editUrl.concat(item.id + '/');
    return this.http.post<string>(editItemUrl, {
      count: item.count,
      description: item.description,
    }, this.common.getHttpHeader());
  }

}
