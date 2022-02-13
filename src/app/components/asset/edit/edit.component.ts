import { Component, OnInit } from '@angular/core';

import { AssetService } from 'src/app/services/asset/asset.service';

import { User } from '../../../shared/types/user';
import { Message } from '../../../shared/types/message';
import { Common } from '../../../shared/common';
import { Asset } from 'src/app/shared/types/asset';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private assetService: AssetService) { }

  ngOnInit(): void {
    this.assetService.getEditInfo().subscribe({
      next: (v) => {
        // console.log('EditComponent: ' + JSON.stringify(v));
        let objAsset: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).asset);
        let objStatusList: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).status);
        let objTypeList: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).type);

        console.log('EditComponent: ' + JSON.stringify(objAsset));

        objStatusList.forEach(element => {
          if (element) {
            console.log('EditComponent: ' + JSON.stringify(element));
          }
        });

        objTypeList.forEach(element => {
          if (element) {
            console.log('EditComponent: ' + JSON.stringify(element));
          }
        });
      }
    });
  }

}
