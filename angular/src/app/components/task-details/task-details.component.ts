import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentTask: Task = {};

  message = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTask(this.route.snapshot.params['id']);
    }
  }

  getTask(id: string): void {
    this.taskService.get(id).subscribe({
      next: (data) => {
        this.currentTask = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

}
