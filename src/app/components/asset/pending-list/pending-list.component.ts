import { Component, OnInit } from '@angular/core';

import { AssetService } from 'src/app/services/asset/asset.service';
import { MessageService } from 'src/app/services/message/message.service';

import { Asset } from 'src/app/shared/types/asset';
import { Message } from 'src/app/shared/types/message';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent implements OnInit {

  assetList: Asset[] = [];

  constructor(private assetService: AssetService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.assetService.getPendingAssetList().subscribe({
      next: (v) => {
        // console.log('MyListComponent: ' + JSON.stringify(v));
        let objAssetList: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).asset_list);

        objAssetList.forEach(element => {
          if (element) {
            this.assetList.push(element);
            // console.log('MyListComponent: id ' + element.id + ' '  + element.name + ' : ' + element.user);
          }
        });
      }
    });
  }

  onApprove(item: number, index: number): void {
    // console.log('PendingListComponent: onApprove() ' + item);
    this.assetService.approvePendingAsset(item).subscribe(data => {
      let msg: Message = JSON.parse(JSON.stringify(data));
      this.messageService.add(msg.detail);

      // update local data
      this.assetList.splice(index, 1);
    });
  }

  onDecline(item: number, index: number): void {
    // console.log('PendingListComponent: onDecline() ' + item);
    this.assetService.declinePendingAsset(item).subscribe(data => {
      let msg: Message = JSON.parse(JSON.stringify(data));
      this.messageService.add(msg.detail);

      // update local data
      this.assetList.splice(index, 1);
    });
  }

}
