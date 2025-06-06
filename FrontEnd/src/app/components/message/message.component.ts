import { Component, OnInit } from '@angular/core';

import { MessageService } from 'src/app/services/message/message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
    standalone: false
})
export class MessageComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
