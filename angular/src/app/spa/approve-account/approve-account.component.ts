import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'approve-account',
  templateUrl: './approve-account.component.html',
  styleUrls: ['./approve-account.component.css']
})
export class ApproveAccountComponent {
  @Input() inputValue: string = '';
  @Output() inputValueChange = new EventEmitter<string>();
}
