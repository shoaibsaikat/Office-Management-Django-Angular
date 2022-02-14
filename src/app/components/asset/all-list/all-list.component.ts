import { Component, OnInit } from '@angular/core';

import { AssetService } from 'src/app/services/asset/asset.service';

import { Asset } from 'src/app/shared/types/asset';
import { AssetViewModel } from 'src/app/shared/types/asset-view-model';

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.css']
})
export class AllListComponent implements OnInit {

  assetList: AssetViewModel[] = [];
  statusList: Map<number, string> = new Map<number, string>();
  typeList: Map<number, string> = new Map<number, string>();

  constructor(private assetService: AssetService) { }

  ngOnInit(): void {
    this.assetService.getAllAssetList().subscribe({
      next: (v) => {
        // console.log('MyListComponent: ' + JSON.stringify(v));
        let objAssetList: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).asset_list);
        let objStatusList: string[] = JSON.parse(JSON.parse(JSON.stringify(v)).status);
        let objTypeList: string[] = JSON.parse(JSON.parse(JSON.stringify(v)).type);

        objStatusList.forEach(element => {
          if (element) {
            let status = element.toString().split(',');
            // console.log('AllListComponent: ' + status[0] + ': ' + status[1] + '\n');
            this.statusList.set(Number(status[0]), status[1]);
          }
        });

        objTypeList.forEach(element => {
          if (element) {
            let type = element.toString().split(',');
            // console.log('AllListComponent: ' + type[0] + ': ' + type[1] + '\n');
            this.typeList.set(Number(type[0]), type[1]);
          }
        });

        objAssetList.forEach(element => {
          if (element) {
            let assetViewModel: AssetViewModel = {
              id: element.id,
              model: element.model,
              name: element.name,
              purchase_date: element.purchase_date,
              serial: element.serial,
              status: this.statusList.get(element.status) || '',
              type: this.typeList.get(element.type) || '',
              user: element.user,
              user_first_name: element.user_first_name,
              user_last_name: element.user_last_name,
              warranty: element.warranty,
              description: element.description,
              next_user: element.next_user,
            }
            this.assetList.push(assetViewModel);
            // console.log('AllListComponent: id:' + assetViewModel.id + ', user:' + element.user, ', status:' + assetViewModel.status);
          }
        });
      }
    });
  }

}
