export interface ProcessDefinition {
  processDefinitionKey: number;
  name: string;
  resourceName: string;
  version: number;
  versionTag: string | null;
  processDefinitionId: string;
  tenantId: string;
  bpmnProcessId: string;
  versions?: number[]; // Optional: for dropdown support
}
