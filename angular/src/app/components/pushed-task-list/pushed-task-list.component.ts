import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  pushedTasks: PushedTask[] = [];
  currentTask: any = {}; // remains empty until a task is clicked
  activeTaskKey: number | null = null;
  private eventSource: EventSource | null = null;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit(): void {
    this.eventSource = new EventSource('http://localhost:8080/api/task-updates');
    this.eventSource.onmessage = (event) => {
      const task: PushedTask = JSON.parse(event.data);
      this.pushedTasks.push(task);
      this.cdr.detectChanges();
    };
    this.eventSource.onerror = (error) => {
      console.error('SSE error:', error);
    };
  }

  setActiveTask(task: PushedTask): void {
    this.activeTaskKey = task.userTaskKey;
    // Only load details when a task is clicked
    this.currentTask = {}; // clear previous details
    this.http.get<any[]>(`http://localhost:8080/api/tasks/${task.userTaskKey}`)
      .subscribe({
        next: (data) => {
          this.currentTask = data && data.length ? data[0] : {};
          this.cdr.detectChanges();
        },
        error: (e) => {
          console.error(e);
          this.currentTask = {};
          this.cdr.detectChanges();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
