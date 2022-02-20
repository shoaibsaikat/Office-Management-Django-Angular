import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequisitionService } from 'src/app/services/requisition/requisition.service';
import { MessageService } from 'src/app/services/message/message.service';

import { AppComponent } from 'src/app/app.component';

import { Message } from '../../../shared/types/message';
import { Requisition } from 'src/app/shared/types/requisition';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: number = 0;
  requisition?: Requisition;

  constructor(
    private activatedRoute: ActivatedRoute,
    private requisitionService: RequisitionService,
    private messageService: MessageService,
    private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.requisitionService.getDetail(this.id).subscribe({
        next: (v) => {
          // console.log('EditComponent: ' + JSON.stringify(v));
          this.requisition = JSON.parse(JSON.parse(JSON.stringify(v)).requisition);
        }
      });
    });
  }

}
