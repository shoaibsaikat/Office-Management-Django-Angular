import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { LeaveService } from 'src/app/services/leave/leave.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { Leave } from '../../../shared/types/leave';
import { Message } from 'src/app/shared/types/message';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  leaveList: Leave[] = [];

  constructor(private leaveService: LeaveService, private messageService: MessageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.leaveService.getRequestLeaveList().subscribe({
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

  onItemSelected(item: Leave): void {
    this.leaveService.setCurrentLeave(item);
    this.appComponent.navigate('leave/detail');
  }


  onSubmit(index: number): void {
    // console.log('RequestListComponent: index: ' + index + ': ' + this.leaveList[index].title);
    this.leaveService.approveLeave(this.leaveList[index].id).subscribe(data => {
      let msg: Message = JSON.parse(JSON.stringify(data));
      this.messageService.add(msg.detail);
      // update local data
      this.leaveList.splice(index, 1);
    });
  }

}
