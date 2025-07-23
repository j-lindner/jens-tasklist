import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { ProcessesListComponent } from './components/processes-list/processes-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { Form1aComponent } from './forms/form1a/form1a.component';
import { Form1bComponent } from './forms/form1b/form1b.component';


const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksListComponent },
  { path: 'tasks/:id', component: TaskDetailsComponent },
  { path: 'forms/formForUserTask1a', component: Form1aComponent },
  { path: 'forms/formForUserTask1b', component: Form1bComponent },
  { path: 'processes', component: ProcessesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
