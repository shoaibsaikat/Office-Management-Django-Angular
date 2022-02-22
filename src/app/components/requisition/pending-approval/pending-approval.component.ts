import { Component, OnInit } from '@angular/core';

import { RequisitionService } from 'src/app/services/requisition/requisition.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { Requisition } from 'src/app/shared/types/requisition';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-pending-approval',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.css']
})
export class PendingApprovalComponent implements OnInit {

  requisitionList: Requisition[] = [];
  distributorList: User[] = [];

  constructor(private requisitionService: RequisitionService, private messageService: MessageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.requisitionService.getApprovalList().subscribe({
      next: (v) => {
        // console.log('ListComponent: ' + JSON.stringify(v));
        let requisitionList: Requisition[] = JSON.parse(JSON.parse(JSON.stringify(v)).requisition_list);
        let distributorList: User[] = JSON.parse(JSON.parse(JSON.stringify(v)).distributor_list);

        requisitionList.forEach(element => {
          if (element) {
            this.requisitionList.push(element);
          }
        });

        distributorList.forEach(element => {
          if (element) {
            this.distributorList.push(element);
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
