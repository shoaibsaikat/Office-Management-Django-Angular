import { Component, OnInit } from '@angular/core';

import { AssetService } from 'src/app/services/asset/asset.service';

import { User } from '../../../shared/types/user';
import { Message } from '../../../shared/types/message';
import { Common } from '../../../shared/common';
import { Asset } from 'src/app/shared/types/asset';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private assetService: AssetService) { }

  ngOnInit(): void {
    this.assetService.getAddInfo().subscribe({
      next: (v) => {
        // console.log('CreateComponent: ' + JSON.stringify(v));
        let objStatusList: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).status);
        let objTypeList: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).type);

        objStatusList.forEach(element => {
          if (element) {
            console.log('CreateComponent: ' + JSON.stringify(element));
          }
        });

        objTypeList.forEach(element => {
          if (element) {
            console.log('CreateComponent: ' + JSON.stringify(element));
          }
        });
      }
    });
  }

}
