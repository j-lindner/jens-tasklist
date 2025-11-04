import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksListComponent} from './components/tasks-list/tasks-list.component';
import {ProcessesListComponent} from './components/processes-list/processes-list.component';
import {TaskDetailsComponent} from './components/task-details/task-details.component';
import {VerifyCustomerIdentityComponent} from './spa/verify-customer-identity/verify-customer-identity.component';
import {CollectCustomerDocumentsComponent} from "./spa/collect-customer-documents/collect-customer-documents.component";
import {SpaTaskStreamComponent} from "./spa/spa-task-stream.component";


const routes: Routes = [
  {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  {path: 'tasks', component: TasksListComponent},
  {path: 'tasks/:id', component: TaskDetailsComponent},
  {path: 'spa/collect-customer-documents', component: CollectCustomerDocumentsComponent},
  {path: 'spa/verify-customer-identity', component: VerifyCustomerIdentityComponent},
  {path: 'processes', component: ProcessesListComponent},
  {path: 'spa', component: SpaTaskStreamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
