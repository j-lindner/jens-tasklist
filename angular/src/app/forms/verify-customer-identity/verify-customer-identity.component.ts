import { Component } from '@angular/core';
import { Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-customer-identity',
  templateUrl: './verify-customer-identity.component.html',
  styleUrl: './verify-customer-identity.component.css'
})
export class VerifyCustomerIdentityComponent {
  task: any;

  identityType: string = '';
  identityNumber: string = '';
  verificationStatus: string = '';

  constructor(private router: Router, private http: HttpClient) {
    const nav = this.router.getCurrentNavigation();
    this.task = nav?.extras.state?.['task'];
  }

  verifyIdentity() {
    const payload = {
      identityType: this.identityType,
      identityNumber: this.identityNumber,
      verificationStatus: this.verificationStatus
    };
    this.http.post(`http://localhost:8080/api/tasks/${this.task.userTaskKey}`, payload)
      .subscribe({
        next: () => alert('Identity verification submitted!'),
        error: () => alert('Error submitting identity verification.')
      });
  }
}
