import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { ProcessesListComponent } from './components/processes-list/processes-list.component';
import {VerifyCustomerIdentityComponent } from './spa/verify-customer-identity/verify-customer-identity.component';
import {CollectCustomerDocumentsComponent} from "./spa/collect-customer-documents/collect-customer-documents.component";
import {SpaTaskStreamComponent} from "./spa/spa-task-stream.component";
import {ApproveAccountComponent} from "./spa/approve-account/approve-account.component";
import {NotifyCustomerComponent} from "./spa/notify-customer/notify-customer.component";
import {ReviewApplicationComponent} from "./spa/review-application/review-application.component";

@NgModule({
  declarations: [
    AppComponent,
    TaskDetailsComponent,
    TasksListComponent,
    ApproveAccountComponent,
    CollectCustomerDocumentsComponent,
    NotifyCustomerComponent,
    ReviewApplicationComponent,
    VerifyCustomerIdentityComponent,
    ProcessesListComponent,
    SpaTaskStreamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
