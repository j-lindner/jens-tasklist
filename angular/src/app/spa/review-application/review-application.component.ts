import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'review-application',
  templateUrl: './review-application.component.html',
  styleUrls: ['./review-application.component.css']
})
export class ReviewApplicationComponent {
  @Input() inputValue: string = '';
  @Output() inputValueChange = new EventEmitter<string>();
}
