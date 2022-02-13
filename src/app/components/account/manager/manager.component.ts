import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AppComponent } from 'src/app/app.component';

import { AccountService } from '../../../services/account/account.service';

import { User } from 'src/app/types/user';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})

export class ManagerComponent implements OnInit {

  managerList: User[] = [];
  managerForm = new FormGroup({
    manager: new FormControl(),
  });
  currentManger: number = -1;

  constructor(private appComponent: AppComponent, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.getMangerList();
    this.currentManger = this.appComponent.user.manager_id || -1;
    // console.log('ManagerComponent: current ' + this.currentManger);
  }

  getMangerList(): void {
    this.accountService.getMangerList().subscribe({
      next: (v) => {
        this.managerList = [];
        let objList: User[] = JSON.parse(JSON.parse(JSON.stringify(v)).user_list);
        objList.forEach(element => {
          if (element && element.id != this.currentManger) {
            this.managerList.push(element);
            // console.log('ManagerComponent: id ' + element.id + ' '  + element.first_name);
          }
        });
      }
    });
  }

  onSubmit(): void {
    // console.log('ManagerComponent: selected ' + this.managerForm.value.manager);
    this.accountService.setManger(this.managerForm.value.manager).subscribe(data => {
      // console.log('ManagerComponent: ' + data.detail);
      this.appComponent.user.manager_id = this.managerForm.value.manager;
      this.appComponent.saveCurrentUser();
      this.currentManger = this.managerForm.value.manager;
      this.router.navigate(['']);
    });
  }

}
