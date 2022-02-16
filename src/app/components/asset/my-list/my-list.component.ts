import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { AssetService } from 'src/app/services/asset/asset.service';
import { MessageService } from 'src/app/services/message/message.service';

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
  assignFormList: FormGroup[] = [];

  constructor(private assetService: AssetService, private messageService: MessageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.assetService.getMyAssetList().subscribe({
      next: (v) => {
        // console.log('MyListComponent: ' + JSON.stringify(v));
        let objUserList: User[] = JSON.parse(JSON.parse(JSON.stringify(v)).user_list);
        let objAssetList: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).asset_list);

        objAssetList.forEach(element => {
          if (element) {
            this.assetList.push(element);
            console.log('MyListComponent: id ' + element.id + ':' + element.user + ':' + element.next_user + ','  + element.name);
          }
        });

        objUserList.forEach(element => {
          if (element && element.id != this.appComponent.user.id) {
            this.userList.push(element);
          }
        });

        // generate form groups
        this.assetList.forEach(element => {
          this.assignFormList.push(new FormGroup({
            user: new FormControl(),
          }));
        });
        // console.log('MyListComponent: ngOnInit() ' + this.assignFormList.length);
      }
    });
  }

  onSubmit(index: number): void {
    // console.log('MyListComponent: index: ' + index + ', item.id: ' + this.assetList[index].id + ', user id: ' + this.assignFormList[index].get('user')?.value);
    this.assetService.assignAsset(this.assetList[index].id, this.assignFormList[index].get('user')?.value).subscribe(data => {
      // console.log('MyListComponent: ' + JSON.stringify(data));
      let msg: Message = JSON.parse(JSON.stringify(data));
      this.messageService.add(msg.detail);
      // this.appComponent.navigate('');
    });
  }

}
