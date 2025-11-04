import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'verify-customer-identity',
  templateUrl: './verify-customer-identity.component.html',
  styleUrls: ['./verify-customer-identity.component.css']
})
export class VerifyCustomerIdentityComponent {
  @Input() inputValue: string = '';
  @Output() inputValueChange = new EventEmitter<string>();
}
