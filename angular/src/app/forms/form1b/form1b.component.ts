import { Component } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-form1b',
  templateUrl: './form1b.component.html',
  styleUrl: './form1b.component.css'
})
export class Form1bComponent {
  task: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.task = nav?.extras.state?.['task'];
  }
}
