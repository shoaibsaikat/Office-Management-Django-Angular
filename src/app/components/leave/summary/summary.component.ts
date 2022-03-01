import { Component, OnInit } from '@angular/core';

import { LeaveService } from 'src/app/services/leave/leave.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { LeaveSummary } from 'src/app/shared/types/leave_summary';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  leaveList: LeaveSummary[] = [];

  constructor(private leaveService: LeaveService, private messageService: MessageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.leaveService.getLeaveSummaryList().subscribe({
      next: (v) => {
        // console.log('SummaryComponent: ' + JSON.stringify(v));
        let leaveList: LeaveSummary[] = JSON.parse(JSON.parse(JSON.stringify(v)).leave_list);

        leaveList.forEach(element => {
          if (element) {
            this.leaveList.push(element);
            // console.log('SummaryComponent: ' + element.user + ':' + element.first_name);
          }
        });
      }
    });
  }

}
