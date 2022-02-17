import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { Message } from '../../../shared/types/message';
import { Inventory } from 'src/app/shared/types/inventory';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  inventoryList: Inventory[] = [];
  inventoryFormList: FormGroup[] = [];

  constructor(private inventoryService: InventoryService, private messageService: MessageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.inventoryService.getInventoryList().subscribe({
      next: (v) => {
        // console.log('ListComponent: ' + JSON.stringify(v));
        let objInventoryList: Inventory[] = JSON.parse(JSON.parse(JSON.stringify(v)).inventory_list);

        objInventoryList.forEach(element => {
          if (element) {
            this.inventoryList.push(element);
            // console.log('ListComponent: id ' + element.id + ':' + element.name);
          }
        });

        // generate form groups
        this.inventoryList.forEach(element => {
          this.inventoryFormList.push(new FormGroup({
            count: new FormControl(),
          }));
        });
        // set inventory count to form
        this.inventoryFormList.forEach((element, i) => {
          element.get('count')?.setValue(this.inventoryList[i].count);
        });
      }
    });
  }

  onSubmit(index: number): void {
    // console.log('ListComponent: index: ' + index + ': ' + this.inventoryFormList[index].get('count')?.value);
    this.inventoryService.inventoryQuickUpdate(this.inventoryList[index].id, this.inventoryFormList[index].get('count')?.value).subscribe(data => {
      let msg: Message = JSON.parse(JSON.stringify(data));
      this.messageService.add(msg.detail);
      // update local data
      this.inventoryList[index].count = this.inventoryFormList[index].get('count')?.value;
    });
  }

  checkInventoryCount(index: number): boolean {
    return false ? this.inventoryFormList[index].get('count')?.value >= 0 : true;
  }

}
