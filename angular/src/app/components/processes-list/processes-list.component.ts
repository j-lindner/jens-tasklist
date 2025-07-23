import { Component, OnInit } from '@angular/core';
import {ProcessService} from "../../services/process.service";
import {ProcessInstance} from "../../models/processinstance.model";

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.css'],
})
export class ProcessesListComponent implements OnInit {
  ngOnInit(): void {
    this.retrieveProcessInstances();
  }

  retrieveProcessInstances(): void {
    this.processService.getAll().subscribe({
      next: (data) => {
        this.allProcessInstances = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  allProcessInstances?: ProcessInstance[];
  currentProcessInstance: ProcessInstance = {};

  constructor(private processService: ProcessService) {}

  newAssignee1 = '';
  newAssignee2 = '';
  var1 = '';

  createProcessInstance(): void {
    const variables = {
      assignee1: this.newAssignee1,
      assignee2: this.newAssignee2,
      var1: this.var1
    };

    this.processService.createProcess(variables).subscribe({
      next: (response) => {
        console.log('Process started:', response);
        alert('Process started with instance key: ' + response.processInstanceKey);
      },
      error: (error) => {
        console.error('Error starting process', error);
        alert('Failed to start process.');
      }
    });
  }

  setActiveProcessInstance(processInstance: ProcessInstance): void {
    this.currentProcessInstance = processInstance;
  }
}
