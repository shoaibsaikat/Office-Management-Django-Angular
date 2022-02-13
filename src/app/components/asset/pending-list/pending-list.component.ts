import { Component, OnInit } from '@angular/core';

import { AssetService } from 'src/app/services/asset/asset.service';

import { Asset } from 'src/app/shared/types/asset';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent implements OnInit {

  assetList: Asset[] = [];

  constructor(private assetService: AssetService) { }

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

  onSubmit(item: number): void {
    console.log('PendingListComponent: ' + item);
  }

}
