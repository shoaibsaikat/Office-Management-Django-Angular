import { Component, OnInit } from '@angular/core';

import { RequisitionService } from 'src/app/services/requisition/requisition.service';

import { Requisition } from 'src/app/shared/types/requisition';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: number = 0;
  requisition?: Requisition;

  constructor(private requisitionService: RequisitionService) { }

  ngOnInit(): void {
    this.requisition = this.requisitionService.getCurrentRequisition();
  }

}
