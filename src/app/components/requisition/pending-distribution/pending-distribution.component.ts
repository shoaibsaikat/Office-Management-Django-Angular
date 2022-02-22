import { Component, OnInit } from '@angular/core';

import { RequisitionService } from 'src/app/services/requisition/requisition.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { Requisition } from 'src/app/shared/types/requisition';

@Component({
  selector: 'app-pending-distribution',
  templateUrl: './pending-distribution.component.html',
  styleUrls: ['./pending-distribution.component.css']
})
export class PendingDistributionComponent implements OnInit {

  requisitionList: Requisition[] = [];

  constructor(private requisitionService: RequisitionService, private messageService: MessageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.requisitionService.getDistributionList().subscribe({
      next: (v) => {
        // console.log('ListComponent: ' + JSON.stringify(v));
        let requisitionList: Requisition[] = JSON.parse(JSON.parse(JSON.stringify(v)).requisition_list);

        requisitionList.forEach(element => {
          if (element) {
            this.requisitionList.push(element);
          }
        });
      }
    });
  }

  onClick(item: Requisition): void {
    this.requisitionService.setCurrentRequisition(item);
    this.appComponent.navigate('requisition/detail');
  }

}
