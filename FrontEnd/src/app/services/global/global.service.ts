import { Injectable } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription, timer, map } from 'rxjs'; 

import { User } from 'src/app/shared/types/user';

import { MessageService } from '../message/message.service';
import { AccountService } from '../account/account.service';

// NOTE: never ever reference or inject AppComponent here, this will create circular dependency

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  user: User = this.getEmptyUser();
  errorMsg: string = '';
  tokenSubscription?: Subscription;

  constructor(private router: Router, private messageService: MessageService, private accountService: AccountService) { }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  getEmptyUser() {
    return {
      id: -1,
      first_name: '',
      last_name: '',
      username: '',
    };
  }

  saveEmptyUser(): void {
    this.user.id = -1;
    this.user.username = '';
    this.user.first_name = '';
    this.user.last_name = '';
    this.user.email = undefined;
    this.user.manager_id = undefined;
    this.user.token = undefined;
    this.user.can_approve_inventory = undefined;
    this.user.can_approve_leave = undefined;
    this.user.can_distribute_inventory = undefined;
    this.user.can_manage_asset = undefined;

    this.setCurrentUser(this.user);
    // console.log('AppComponent:saveEmptyUser() ' + this.user.id + ' : ' + this.user.username);
  }

  loadCurrentUser(): void {
    this.user.id = Number(localStorage.getItem('user_id')) || -1;
    this.user.username = localStorage.getItem('username') || '';
    this.user.first_name = localStorage.getItem('first_name') || '';
    this.user.last_name = localStorage.getItem('last_name') || '';
    this.user.token = localStorage.getItem('token') || undefined;
    this.user.manager_id = Number(localStorage.getItem('manager_id')) || -1;
    this.user.can_approve_inventory = true ? localStorage.getItem('can_approve_inventory') === 'true' : false;
    this.user.can_approve_leave = true ? localStorage.getItem('can_approve_leave') === 'true' : false;
    this.user.can_distribute_inventory = true ? localStorage.getItem('can_distribute_inventory') === 'true' : false;
    this.user.can_manage_asset = true ? localStorage.getItem('can_manage_asset') === 'true' : false;
    // console.log('AppComponent:constructor() ' + localStorage.getItem('token'));
    // console.log('AppComponent:constructor() ' + this.user.can_manage_asset);
  }

  saveCurrentUser(): void {
    if (this.user) {
      localStorage.setItem('user_id', this.user.id.toString());
      localStorage.setItem('username', this.user.username);
      localStorage.setItem('first_name', this.user.first_name);
      localStorage.setItem('last_name', this.user.last_name);
      localStorage.setItem('token', this.user?.token ? this.user.token : '');
      localStorage.setItem('manager_id', this.user.manager_id?.toString() || '-1');
      localStorage.setItem('can_approve_inventory', this.user.can_approve_inventory?.toString() || 'false');
      localStorage.setItem('can_approve_leave', this.user.can_approve_leave?.toString() || 'false');
      localStorage.setItem('can_distribute_inventory', this.user.can_distribute_inventory?.toString() || 'false');
      localStorage.setItem('can_manage_asset', this.user.can_manage_asset?.toString() || 'false');
      // console.log('AppComponent:saveCurrentUser() ' + this.user.can_manage_asset);
    } else {
      localStorage.setItem('token', '');
    }
    // console.log('AppComponent:saveCurrentUser() ' + this.user.id + ' : ' + this.user.username);
  }

  setCurrentUser(user: User): void {
    this.user.id = user.id;
    this.user.username = user.username;
    this.user.first_name = user.first_name;
    this.user.last_name = user.last_name;
    this.user.email = user.email;
    this.user.manager_id = user.manager_id;
    this.user.token = user.token;
    this.user.can_approve_inventory = user.can_approve_inventory;
    this.user.can_approve_leave = user.can_approve_leave;
    this.user.can_distribute_inventory = user.can_distribute_inventory;
    this.user.can_manage_asset = user.can_manage_asset;

    this.saveCurrentUser();
  }

  isValidUser(): boolean {
    if (this.user.token != undefined && this.user.token != '') {
      return true;
    }
    return false;
  }

  logOut(): void {
    this.navigate('');
    this.messageService.clearAll();
    this.saveEmptyUser();
  }

  setError(msg: string): void {
    this.errorMsg = msg;
  }

  clearAllMessage(): void {
    this.messageService.clearAll();
  }

  getUser(): User {
    return this.user;
  }

}
