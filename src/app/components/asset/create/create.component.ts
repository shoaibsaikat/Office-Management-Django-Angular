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

  statusList: Map<number, string> = new Map<number, string>();
  typeList: Map<number, string> = new Map<number, string>();

  constructor(private assetService: AssetService) { }

  ngOnInit(): void {
    this.assetService.getAddInfo().subscribe({
      next: (v) => {
        // console.log('CreateComponent: ' + JSON.stringify(v));
        let objStatusList: string[] = JSON.parse(JSON.parse(JSON.stringify(v)).status);
        let objTypeList: string[] = JSON.parse(JSON.parse(JSON.stringify(v)).type);

        objStatusList.forEach(element => {
          if (element) {
            let status = element.toString().split(',');
            // console.log('CreateComponent: ' + status[0] + ': ' + status[1] + '\n');
            this.statusList.set(Number(status[0]), status[1]);
          }
        });

        objTypeList.forEach(element => {
          if (element) {
            let type = element.toString().split(',');
            // console.log('CreateComponent: ' + type[0] + ': ' + type[1] + '\n');
            this.typeList.set(Number(type[0]), type[1]);
          }
        });
      }
    });
  }

}
