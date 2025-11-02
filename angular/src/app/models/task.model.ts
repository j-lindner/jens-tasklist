export class Task {
  id?: string;
  name?: string;
  processName?: string;
  processDefinitionKey?: string;
  processInstanceKey?: string;
  assignee?: string;
  creationDate?: string;
  completionDate?: string;
  taskState?: string;
  state?: string;
  candidateUsers?: string[];
  candidateGroups?: string[];
  followUpDate?: string;
  dueDate?: string;
  // formKey?: string;
  formId?: string;
  formVersion?: number;
  isFormEmbedded?: boolean;
  taskDefinitionId?: string;
  sortValues?: string[];
  isFirst?: boolean;
  tenantId?: string;
  priority?: number;
  variables?: {
    id: string;
    name: string;
    value: string;
    type: string;
  }[];
  implementation?: string;
  userTaskKey?: number;
  elementId?: string;
  elementInstanceKey?: number;
  bpmnProcessId?: string;
  processDefinitionVersion?: number;
  externalFormReference?: string;
  customHeaders?: { [key: string]: any };
}
