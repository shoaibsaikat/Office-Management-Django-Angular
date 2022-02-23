import { Component, OnInit } from '@angular/core';

import { RequisitionService } from 'src/app/services/requisition/requisition.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { Requisition } from 'src/app/shared/types/requisition';
import { Common } from 'src/app/shared/common';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  requisitionList: Requisition[] = [];

  constructor(private requisitionService: RequisitionService, private messageService: MessageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.requisitionService.getMyRequisitionList().subscribe({
      next: (v) => {
        // console.log('ListComponent: ' + JSON.stringify(v));
        let objRequisitionList: Requisition[] = JSON.parse(JSON.parse(JSON.stringify(v)).requisition_list);

        objRequisitionList.forEach(element => {
          if (element) {
            this.requisitionList.push(element);
            // console.log('ListComponent: id ' + element.id + ':' + element.name);
          }
        });
      }
    });
  }

  onClick(item: Requisition): void {
    this.requisitionService.setCurrentRequisition(item);
    this.appComponent.navigate('requisition/detail/' + Common.DETAIL_NORMAL);
  }

}
