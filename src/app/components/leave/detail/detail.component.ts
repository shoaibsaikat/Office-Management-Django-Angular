import { Component, OnInit } from '@angular/core';

import { Leave } from 'src/app/shared/types/leave';

import { LeaveService } from 'src/app/services/leave/leave.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  leave: Leave = this.leaveService.getEmptyLeave();

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.leave = this.leaveService.getCurrentLeave();
  }

}
