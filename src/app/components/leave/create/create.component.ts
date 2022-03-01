import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LeaveService } from 'src/app/services/leave/leave.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { Message } from '../../../shared/types/message';
import { Leave } from 'src/app/shared/types/leave';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  leaveForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, ]),
    start: new FormControl('', [Validators.required, ]),
    count: new FormControl('', [Validators.required, ]),
    comment: new FormControl('', [Validators.required, ]),
  });
  get title() { return this.leaveForm.get('title'); }
  get start() { return this.leaveForm.get('start'); }
  get count() { return this.leaveForm.get('count'); }
  get comment() { return this.leaveForm.get('comment'); }

  constructor(private leaveService: LeaveService, private messageService: MessageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.leaveService.getLeaveCreationData().subscribe({
        next: (v) => {
          // console.log('CreateComponent: ' + v);
        }, error: (e) => {
          // console.error('CreateComponent: Error ' + e);
          this.appComponent.navigate('account/manager');
        }, complete: () => {
          // console.info('complete');
        }
    });
  }

  onSubmit(): void {
    // let item:Leave = {
    //   id: -1,
    //   name: this.name?.value,
    //   count: this.count?.value,
    //   unit: this.unit?.value,
    //   description: this.description?.value,
    // }
    // // console.log('CreateComponent: item.name: ' + this.name?.value);
    // this.inventoryService.createInventoryItem(item).subscribe(data => {
    //   let msg: Message = JSON.parse(JSON.stringify(data));
    //   this.messageService.add(msg.detail);
    //   this.appComponent.navigate('/inventory/list');
    // });

  }

}
