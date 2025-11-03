package org.camunda.consulting.jenstasklist.rest;

import io.camunda.client.CamundaClient;
import io.camunda.client.api.response.ProcessInstanceEvent;
import io.camunda.client.api.search.enums.ProcessInstanceState;
import io.camunda.client.api.search.response.ProcessDefinition;
import io.camunda.client.api.search.response.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProcessController {

    @Autowired
    private CamundaClient client;


    @PostMapping("/process/{bpmnProcessId}")
    public ProcessInstanceEvent createProcess(@PathVariable String bpmnProcessId, @RequestBody Map<String, Object> processVariables) {
        return client.newCreateInstanceCommand().bpmnProcessId(bpmnProcessId).latestVersion().variables(processVariables)
                .send().join();
    }

    @GetMapping("/processes")
    public List<ProcessInstance> getProcesses() {
         return client.newProcessInstanceSearchRequest()
                 .filter(f -> f.state(ProcessInstanceState.ACTIVE))
                 .send().join().items();
    }

    @GetMapping("/process-definitions")
    public List<ProcessDefinition> getProcessDefinitions() {
         return client.newProcessDefinitionSearchRequest()
                 .filter(f -> f.isLatestVersion(true))
                 .send().join().items();
    }

}
