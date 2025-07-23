import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form1a',
  templateUrl: './form1a.component.html',
  styleUrl: './form1a.component.css'
})
export class Form1aComponent {
  task: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.task = nav?.extras.state?.['task'];
  }
}
