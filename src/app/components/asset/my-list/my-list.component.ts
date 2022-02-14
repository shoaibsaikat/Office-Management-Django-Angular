import { Component, OnInit } from '@angular/core';

import { AssetService } from 'src/app/services/asset/asset.service';

import { AppComponent } from 'src/app/app.component';

import { User } from '../../../shared/types/user';
import { Message } from '../../../shared/types/message';
import { Common } from '../../../shared/common';
import { Asset } from 'src/app/shared/types/asset';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  userList: User[] = [];
  assetList: Asset[] = [];

  constructor(private assetService: AssetService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.assetService.getMyAssetList().subscribe({
      next: (v) => {
        // console.log('MyListComponent: ' + JSON.stringify(v));
        let objUserList: User[] = JSON.parse(JSON.parse(JSON.stringify(v)).user_list);
        let objAssetList: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).asset_list);

        objAssetList.forEach(element => {
          if (element) {
            this.assetList.push(element);
            // console.log('MyListComponent: id ' + element.id + ' '  + element.name + ' : ' + element.user);
          }
        });

        objUserList.forEach(element => {
          if (element && element.id != this.appComponent.user.id) {
            this.userList.push(element);
          }
        });
      }
    });
  }

  onSubmit(item: number): void {
    // console.log('MyListComponent: ' + item + ' clicked');
  }

}
