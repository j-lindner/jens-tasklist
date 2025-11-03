import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { ProcessesListComponent } from './components/processes-list/processes-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { VerifyCustomerIdentityComponent } from './forms/verify-customer-identity/verify-customer-identity.component';
import {PushedTaskListComponent} from "./components/pushed-task-list/pushed-task-list.component";
import {CollectCustomerDocumentsComponent} from "./forms/collect-customer-documents/collect-customer-documents.component";


const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksListComponent },
  { path: 'tasks/:id', component: TaskDetailsComponent },
  { path: 'forms/collect-customer-documents-form', component: CollectCustomerDocumentsComponent },
  { path: 'forms/verify-customer-identity-form', component: VerifyCustomerIdentityComponent },
  { path: 'processes', component: ProcessesListComponent },
  { path: 'pushed-task-list', component: PushedTaskListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
