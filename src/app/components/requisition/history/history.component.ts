import { Component, OnInit } from '@angular/core';

import { RequisitionService } from 'src/app/services/requisition/requisition.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { Message } from '../../../shared/types/message';
import { Requisition } from 'src/app/shared/types/requisition';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  requisitionList: Requisition[] = [];

  constructor(private requisitionService: RequisitionService, private messageService: MessageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.requisitionService.getHistory().subscribe({
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

}
