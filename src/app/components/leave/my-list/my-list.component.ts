import { Component, OnInit } from '@angular/core';

import { LeaveService } from 'src/app/services/leave/leave.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { Leave } from '../../../shared/types/leave';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  leaveList: Leave[] = [];

  constructor(private leaveService: LeaveService, private messageService: MessageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.leaveService.getMyLeaveList().subscribe({
      next: (v) => {
        // console.log('MyListComponent: ' + JSON.stringify(v));
        let leaveList: Leave[] = JSON.parse(JSON.parse(JSON.stringify(v)).leave_list);

        leaveList.forEach(element => {
          if (element) {
            this.leaveList.push(element);
            // console.log('MyListComponent: id ' + element.id + ':' + element.name);
          }
        });
      }
    });
  }

  onClick(item: Leave): void {
    this.leaveService.setCurrentLeave(item);
    this.appComponent.navigate('leave/detail');
  }

}
