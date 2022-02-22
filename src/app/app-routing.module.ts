import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/account/signin/signin.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { ManagerComponent } from './components/account/manager/manager.component';
import { PasswordComponent } from './components/account/password/password.component';
import { MyListComponent as AssetMyListComponent } from './components/asset/my-list/my-list.component';
import { AllListComponent } from './components/asset/all-list/all-list.component';
import { PendingListComponent } from './components/asset/pending-list/pending-list.component';
import { EditComponent as AssetEditComponent } from './components/asset/edit/edit.component';
import { CreateComponent as AssetCreateComponent } from './components/asset/create/create.component';
import { ListComponent } from './components/inventory/list/list.component';
import { CreateComponent as InventoryCreateComponent } from './components/inventory/create/create.component';
import { EditComponent as InventoryEditComponent } from './components/inventory/edit/edit.component';
import { HistoryComponent } from './components/requisition/history/history.component';
import { DetailComponent as RequisitionDetailComponent } from './components/requisition/detail/detail.component';
import { MyListComponent as RequisitionMyListComponent } from './components/requisition/my-list/my-list.component';
import { CreateComponent as RequisitionCreateComponent } from './components/requisition/create/create.component';
import { PendingApprovalComponent } from './components/requisition/pending-approval/pending-approval.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/signin', component: SigninComponent },
  { path: 'account/profile', component: ProfileComponent },
  { path: 'account/manager', component: ManagerComponent },
  { path: 'account/password', component: PasswordComponent },
  { path: 'asset/my_list', component: AssetMyListComponent },
  { path: 'asset/all_list', component: AllListComponent },
  { path: 'asset/pending_list', component: PendingListComponent },
  { path: 'asset/create', component: AssetCreateComponent },
  { path: 'asset/edit/:id', component: AssetEditComponent },
  { path: 'inventory/list', component: ListComponent },
  { path: 'inventory/create', component: InventoryCreateComponent },
  { path: 'inventory/edit/:id', component: InventoryEditComponent },
  { path: 'requisition/history', component: HistoryComponent },
  { path: 'requisition/detail/:id', component: RequisitionDetailComponent },
  { path: 'requisition/my_list', component: RequisitionMyListComponent },
  { path: 'requisition/create', component: RequisitionCreateComponent },
  { path: 'requisition/approval', component: PendingApprovalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
