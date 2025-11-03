import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessService } from "../../services/process.service";
import { ProcessInstance } from "../../models/processinstance.model";
import { ProcessDefinition } from "../../models/processdefinition.model"; // <-- import model

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.css'],
})
export class ProcessesListComponent implements OnInit {
  allProcessInstances?: ProcessInstance[];
  currentProcessInstance: ProcessInstance = {};

  processDefinitions: ProcessDefinition[] = []; // <-- use model
  selectedProcessDefinitionId: string = '';

  newAssignee1 = '';
  newAssignee2 = '';
  var1 = '';

  showProcessInstances: boolean = false; // <-- add this property

  constructor(private processService: ProcessService, private http: HttpClient) {}

  ngOnInit(): void {
    this.retrieveProcessInstances();

    // Fetch process definitions
    this.http.get<ProcessDefinition[]>('http://localhost:8080/api/process-definitions')
      .subscribe(defs => {
        this.processDefinitions = defs;
        if (defs.length > 0) {
          this.selectedProcessDefinitionId = defs[0].processDefinitionId;
        }
      });
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

  onProcessDefinitionChange(): void {
    // No version logic needed
  }

  onVersionChange(): void {
    // No version logic needed
  }

  createProcess(): void {
    // Find the selected process definition to get its bpmnProcessId
    const selectedDef = this.processDefinitions.find(def => def.processDefinitionId === this.selectedProcessDefinitionId);
    const bpmnId = selectedDef ? selectedDef.bpmnProcessId : this.selectedProcessDefinitionId;

    const payload = {
      assignee1: this.newAssignee1,
      assignee2: this.newAssignee2,
      var1: this.var1
    };
    this.http.post<any>(`http://localhost:8080/api/process/${bpmnId}`, payload)
      .subscribe(result => {
        const instanceKey = result?.processInstanceKey ?? result?.id ?? 'unknown';
        console.log('Process started:', result);
        alert('Process started with instance key: ' + instanceKey);
      }, error => {
        console.error('Error starting process', error);
        alert('Failed to start process.');
      });
  }

  setActiveProcessInstance(processInstance: ProcessInstance): void {
    this.currentProcessInstance = processInstance;
  }
}
