export class ProcessInstance {
  key?: number;
  processVersion?: number;
  processDefinitionId?: string;
  processDefinitionVersion?: string
  parentKey?: number;
  parentFlowNodeInstanceKey?: number;
  startDate?: string;
  endDate?: string;
  state?: string;
  processDefinitionKey?: number;
  tenantId?: string;
}
