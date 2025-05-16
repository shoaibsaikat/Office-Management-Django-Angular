import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GlobalService } from 'src/app/services/global/global.service';
import { AccountService } from '../../../services/account/account.service';
import { MessageService } from 'src/app/services/message/message.service';

import { SignIn } from '../../../shared/types/signin';
import { User } from 'src/app/shared/types/user';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    standalone: false
})
export class SigninComponent implements OnInit {

  constructor(
    private globalService: GlobalService,
    private accountService: AccountService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    let logIn: SignIn = form.value;
    this.accountService.logIn(logIn).subscribe({
      next: (v) => {
        let user: User = v;
        this.globalService.setCurrentUser(user);
        this.globalService.saveCurrentUser();
        this.globalService.navigate('');
        this.messageService.clearAll();
      }
    });
  }

}
