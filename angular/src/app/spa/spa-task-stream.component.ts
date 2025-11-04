import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'spa-task-stream',
  templateUrl: './spa-task-stream.component.html',
  styleUrls: ['./spa-task-stream.component.css']
})
export class SpaTaskStreamComponent implements OnInit, OnDestroy {
  currentTask: any = null;
  eventSource: EventSource | null = null;
  timeoutHandle: any = null;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const task = navigation.extras.state['task'];
      if (task) {
        console.log('Task loaded from navigation state:', task);
        this.loadTaskDetails(task.userTaskKey);
      }
    }
  }

  ngOnInit(): void {
    this.listenForTasks();
  }

  loadTaskDetails(userTaskKey: number): void {
    // Load task details
    this.http.get<any[]>(`http://localhost:8080/api/tasks/${userTaskKey}`).subscribe({
      next: (tasks) => {
        if (tasks && tasks.length > 0) {
          this.currentTask = tasks[0];
          console.log('Task details loaded:', this.currentTask);

          // Load process variables
          this.http.get<any[]>(`http://localhost:8080/api/variables/${userTaskKey}`).subscribe({
            next: (variables) => {
              this.currentTask.processVariables = this.transformVariables(variables);
              console.log('Process variables loaded:', this.currentTask.processVariables);
              this.cdr.detectChanges();
            },
            error: (err) => {
              console.error('Error loading variables:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error loading task details:', err);
      }
    });
  }

  transformVariables(variables: any[]): any {
    if (!variables || !Array.isArray(variables)) {
      return {};
    }
    const result: any = {};
    variables.forEach(v => {
      result[v.name] = v.value;
    });
    return result;
  }

  listenForTasks(): void {
    const userId = 'demo'; // TODO: make dynamic
    this.eventSource = new EventSource(`http://localhost:8080/api/task-updates?userId=${encodeURIComponent(userId)}`);
    this.eventSource.onmessage = (event) => {
      console.log('Received task event:', event.data);
      const taskEvent = JSON.parse(event.data);
      if (taskEvent.action === "COMPLETE") {
        this.router.navigate(['/processes']);
        return;
      }
      this.currentTask = taskEvent;
      this.cdr.detectChanges(); // <-- Ensure UI updates
      this.resetTimeout();
    };
    this.eventSource.onerror = () => {
      this.eventSource?.close();
      this.router.navigate(['/processes']);
    };
    this.resetTimeout();
  }

  resetTimeout(): void {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = setTimeout(() => {
      this.router.navigate(['/processes']);
    }, 60000);
  }

  inputValue: string = '';

  submitTask() {
    if (!this.currentTask) return;
    const payload: any = {};
    switch (this.currentTask.externalFormReference) {
      case 'collect-customer-documents':
        payload.documentType = this.inputValue;
        break;
      case 'verify-customer-identity':
        payload.identityNumber = this.inputValue;
        break;
      case 'review-application':
        payload.approved = this.inputValue;
        break;
      case 'approve-account':
        payload.approvalCode = this.inputValue;
        break;
      case 'notify-customer':
        payload.notificationMessage = this.inputValue;
        break;
      default:
        payload.value = this.inputValue;
    }
    console.log("PAYLOAD: ", payload)
    this.http.post(`http://localhost:8080/api/tasks/demo/${this.currentTask.userTaskKey}`, payload).subscribe(() => {
      this.inputValue = '';
    });
  }

  processVariableKeys(): string[] {
    return this.currentTask && this.currentTask.processVariables
      ? Object.keys(this.currentTask.processVariables)
      : [];
  }

  ngOnDestroy(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
  }
}
