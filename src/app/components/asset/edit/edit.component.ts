import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AssetService } from 'src/app/services/asset/asset.service';
import { AppComponent } from 'src/app/app.component';

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

  id: number = 0;

  assetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, ]),
    warranty: new FormControl('', [Validators.required, ]),
    status: new FormControl('', [Validators.required, ]),
    description: new FormControl(),
  });
  get name() { return this.assetForm.get('name'); }
  get warranty() { return this.assetForm.get('warranty'); }
  get status() { return this.assetForm.get('status'); }
  get description() { return this.assetForm.get('description'); }

  statusList: Map<number, string> = new Map<number, string>();

  constructor(private activatedRoute: ActivatedRoute, private assetService: AssetService, private appComponent: AppComponent) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
        this.id = Number(params.get('id'));
        // console.log('EditComponent: ' + this.id);

        this.assetService.getEditInfo(this.id).subscribe({
          next: (v) => {
            // console.log('EditComponent: ' + JSON.stringify(v));
            let objAsset: Asset = JSON.parse(JSON.parse(JSON.stringify(v)).asset);
            let objStatusList: Asset[] = JSON.parse(JSON.parse(JSON.stringify(v)).status);
            // console.log('EditComponent: ' + JSON.stringify(objAsset));
            objStatusList.forEach(element => {
              if (element) {
                let status = element.toString().split(',');
                // console.log('EditComponent: ' + status[0] + ': ' + status[1] + '\n');
                this.statusList.set(Number(status[0]), status[1]);
              }
            });
            this.name?.setValue(objAsset.name);
            this.warranty?.setValue(objAsset.warranty);
            this.description?.setValue(objAsset.description);
          }
        });
    });
  }

  onSubmit(): void {
    let asset = {
      name: this.name?.value,
      warranty: this.warranty?.value,
      status: this.status?.value,
      description: this.description?.value || '',
    };

    this.assetService.updateAsset(this.id, asset).subscribe(data => {
      // console.log('ManagerComponent: ' + data.detail);
      this.appComponent.navigate('');
    });
    console.log('EditComponent: ' + asset.description + ', ' + asset.status + ', ' + asset.warranty);
  }

}
