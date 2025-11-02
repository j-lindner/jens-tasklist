import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  allTasks?: Task[];
  manuAssignedTasks?: Task[];
  var1Val1Tasks?: Task[];
  currentTask: Task = {};
  title = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.retrieveTasks();
    this.retrieveManuAssignedTasks();
    this.retrieveVar1Val1Tasks();
  }

  retrieveTasks(): void {
    this.taskService.getAll().subscribe({
      next: (data) => {
        this.allTasks = data;
        console.log("retrieve all tasks " + data);
      },
      error: (e) => console.error(e)
    });
  }

  retrieveManuAssignedTasks(): void {
    this.taskService.getManuAssigned().subscribe({
      next: (data) => {
        this.manuAssignedTasks = data;
        console.log("retrieve manu-assigned task " + data);
      },
      error: (e) => console.error(e)
    });
  }

  retrieveVar1Val1Tasks(): void {
    this.taskService.getVar1Val1().subscribe({
      next: (data) => {
        this.var1Val1Tasks = data;
        console.log("retrieve var1=val1 tasks " + data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveTasks();
    this.currentTask = {};
  }

  setActiveTask(task: Task): void {
    console.log("set active task:", task);
    this.currentTask = task;
  }


}
