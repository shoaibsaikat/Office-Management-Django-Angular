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

  constructor(private http: HttpClient) { }

  getMyAssetList() {
    this.http.get<string>(this.myListUrl, this.common.getHttpHeader()).subscribe({
      next: (v) => {
        // console.log(JSON.stringify(v));
        let objUserList: User[] = JSON.parse(JSON.parse(JSON.stringify(v)).user_list);
        let objAssetList: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).asset_list);

        objAssetList.forEach(element => {
            console.log('AssetService: id ' + element.id + ' '  + element.name + ' : ' + element.user);
        });
      }
    });
  }

}
