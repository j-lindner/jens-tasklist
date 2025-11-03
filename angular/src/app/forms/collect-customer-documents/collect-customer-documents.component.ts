import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-collect-customer-documents',
  templateUrl: './collect-customer-documents.component.html',
  styleUrl: './collect-customer-documents.component.css'
})
export class CollectCustomerDocumentsComponent {
  task: any;

  customerName: string = '';
  customerAddress: string = '';
  documentType: string = '';
  documentNumber: string = '';

  constructor(private router: Router, private http: HttpClient) {
    const nav = this.router.getCurrentNavigation();
    this.task = nav?.extras.state?.['task'];
    console.log("task: " + JSON.stringify(this.task));
  }

  submitForm() {
    const payload = {
      customerName: this.customerName,
      customerAddress: this.customerAddress,
      documentType: this.documentType,
      documentNumber: this.documentNumber
    };
    console.log("userTaskKey: " + this.task.userTaskKey);
    this.http.post(`http://localhost:8080/api/tasks/${this.task.userTaskKey}`, payload)
      .subscribe({
        next: () => alert('Form submitted and task completed!'),
        error: () => alert('Error submitting form.')
      });
  }
}
