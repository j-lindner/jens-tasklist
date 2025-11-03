import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

interface PushedTask {
  action: string | null;
  assignee: string | null;
  candidateGroups: string[];
  candidateUsers: string[];
  changedAttributes: string[];
  dueDate: string | null;
  followUpDate: string | null;
  formKey: string | null;
  priority: number;
  userTaskKey: number;
}

@Component({
  selector: 'pushed-task-list',
  templateUrl: './pushed-task-list.component.html',
  styleUrls: ['./pushed-task-list.component.css']
})
export class PushedTaskListComponent implements OnInit, OnDestroy {
  tasks: PushedTask[] = [];
  currentTask?: PushedTask;
  private eventSource: EventSource | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.eventSource = new EventSource('http://localhost:8080/api/task-updates');
    this.eventSource.onmessage = (event) => {
      const task: PushedTask = JSON.parse(event.data);
      this.tasks.push(task);
      this.cdr.detectChanges();
    };
    this.eventSource.onerror = (error) => {
      console.error('SSE error:', error);
    };
  }

  setActiveTask(task: PushedTask): void {
    // Log for debugging and always assign a new object reference
    console.log('setActiveTask called:', task);
    this.currentTask = { ...task };
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
