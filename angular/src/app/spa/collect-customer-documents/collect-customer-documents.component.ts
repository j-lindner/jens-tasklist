import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'collect-customer-documents',
  templateUrl: './collect-customer-documents.component.html',
  styleUrls: ['./collect-customer-documents.component.css']
})
export class CollectCustomerDocumentsComponent implements OnInit {
  @Input() inputValue: string = '';
  @Input() userTaskKey: number = 0;
  @Output() inputValueChange = new EventEmitter<string>();
  @Output() submit = new EventEmitter<void>();

  task: any;

  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.task = navigation.extras.state['task'];
    }
  }

  ngOnInit() {
    if (this.task) {
      this.userTaskKey = this.task.userTaskKey;
      console.log('Task loaded from navigation state:', this.task);
    }
  }

  onSubmit() {
    console.log('Submit clicked', this.inputValue, this.userTaskKey);
    const payload = { documentType: this.inputValue };
    this.http.post(`http://localhost:8080/api/tasks/demo/${this.userTaskKey}`, payload).subscribe({
      next: () => {
        console.log('Task completed successfully');
      },
      error: (err) => {
        console.error('Error completing task:', err);
      }
    });
  }
}
