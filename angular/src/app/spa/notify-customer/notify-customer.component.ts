import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'notify-customer',
  templateUrl: './notify-customer.component.html',
  styleUrls: ['./notify-customer.component.css']
})
export class NotifyCustomerComponent {
  @Input() inputValue: string = '';
  @Output() inputValueChange = new EventEmitter<string>();
}
