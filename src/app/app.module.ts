import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RequestInterceptor } from './shared/request-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/account/signin/signin.component';
import { SignoutComponent } from './components/account/signout/signout.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { ManagerComponent } from './components/account/manager/manager.component';
import { PasswordComponent } from './components/account/password/password.component';
import { MessageComponent } from './components/message/message.component';
import { MyListComponent } from './components/asset/my-list/my-list.component';
import { AllListComponent } from './components/asset/all-list/all-list.component';
import { PendingListComponent } from './components/asset/pending-list/pending-list.component';
import { CreateComponent as AssetCreateComponent } from './components/asset/create/create.component';
import { EditComponent as AssetEditComponent } from './components/asset/edit/edit.component';
import { ListComponent } from './components/inventory/list/list.component';
import { CreateComponent as InventoryCreateComponent } from './components/inventory/create/create.component';
import { EditComponent as InventoryEditComponent } from './components/inventory/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignoutComponent,
    HomeComponent,
    ProfileComponent,
    ManagerComponent,
    PasswordComponent,
    MessageComponent,
    MyListComponent,
    AllListComponent,
    PendingListComponent,
    AssetCreateComponent,
    AssetEditComponent,
    ListComponent,
    InventoryCreateComponent,
    InventoryEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
