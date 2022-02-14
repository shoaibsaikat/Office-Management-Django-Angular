import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  assetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, ]),
    model: new FormControl('', [Validators.required, ]),
    serial: new FormControl('', [Validators.required, ]),
    purchaseDate: new FormControl('', [Validators.required, ]),
    warranty: new FormControl('', [Validators.required, ]),
    type: new FormControl('', [Validators.required, ]),
    status: new FormControl('', [Validators.required, ]),
    description: new FormControl(),
  });
  get name() { return this.assetForm.get('name'); }
  get model() { return this.assetForm.get('model'); }
  get serial() { return this.assetForm.get('serial'); }
  get purchaseDate() { return this.assetForm.get('purchaseDate'); }
  get warranty() { return this.assetForm.get('warranty'); }
  get type() { return this.assetForm.get('type'); }
  get status() { return this.assetForm.get('status'); }
  get description() { return this.assetForm.get('description'); }

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

  onSubmit(): void {
    console.log('CreateComponent: ' + this.description?.value + ', ' + this.status?.value + ', ' + this.type?.value + ', ' + this.warranty?.value + ', ' + this.purchaseDate?.value);
  }

}
