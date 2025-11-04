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
  currentTask: Task = {};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.retrieveTasks();
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

  setActiveTask(task: Task): void {
    console.log("set active task:", task);
    this.currentTask = task;
  }


}
