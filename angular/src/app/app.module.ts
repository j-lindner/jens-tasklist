import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { ProcessesListComponent } from './components/processes-list/processes-list.component';
import { Form1aComponent } from './forms/form1a/form1a.component';
import { Form1bComponent } from './forms/form1b/form1b.component';
import {PushedTaskListComponent} from "./components/pushed-task-list/pushed-task-list.component";

@NgModule({
  declarations: [
    AppComponent,
    TaskDetailsComponent,
    TasksListComponent,
    PushedTaskListComponent,
    Form1aComponent,
    Form1bComponent,
    ProcessesListComponent
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
