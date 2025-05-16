import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from './shared/types/user';

import { GlobalService } from './services/global/global.service';
import { LoadingService } from './services/loading/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppComponent {
  title = 'Office Management';

  constructor(
    private loadingService: LoadingService,
    private globalService: GlobalService) {
    this.globalService.loadCurrentUser();
  }

  ngOnInit(): void {
    this.globalService.clearAllMessage();
  }

  isLoading(): Observable<boolean> {
    return this.loadingService.isLoading();
  }

  isValidUser(): boolean {
    return this.globalService.isValidUser();
  }

  getUser(): User {
    return this.globalService.getUser();
  }

}
