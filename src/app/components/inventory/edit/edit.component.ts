import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { Message } from '../../../shared/types/message';
import { Inventory } from 'src/app/shared/types/inventory';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number = 0;
  unit: string = '';
  name: string = '';
  inventoryForm: FormGroup = new FormGroup({
    count: new FormControl('', [Validators.required, ]),
    description: new FormControl(),
  });
  get count() { return this.inventoryForm.get('count'); }
  get description() { return this.inventoryForm.get('description'); }

  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private messageService: MessageService,
    private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.inventoryService.getEditInfo(this.id).subscribe({
        next: (v) => {
          // console.log('EditComponent: ' + JSON.stringify(v));
          let objAsset: Inventory = JSON.parse(JSON.parse(JSON.stringify(v)).inventory);
          this.name = objAsset.name;
          this.unit = objAsset.unit;
          this.inventoryForm.get('count')?.setValue(objAsset.count);
          this.inventoryForm.get('description')?.setValue(objAsset.description);
        }
      });
    });
  }

  onSubmit(): void {
    let item:Inventory = {
      id: this.id,
      name: this.name,
      count: this.count?.value,
      unit: this.unit,
      description: this.description?.value,
    }
    // console.log('EditComponent: item.name: ' + this.name?.value);
    this.inventoryService.updateInventory(item).subscribe(data => {
      // console.log('ManagerComponent: ' + data.detail);
      this.appComponent.navigate('inventory/list');
    });

  }

}
