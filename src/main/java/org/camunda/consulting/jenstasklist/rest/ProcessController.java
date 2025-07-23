package org.camunda.consulting.jenstasklist.rest;

import io.camunda.operate.CamundaOperateClient;
import io.camunda.operate.exception.OperateException;
import io.camunda.operate.model.ProcessInstance;
import io.camunda.operate.search.SearchQuery;
import io.camunda.zeebe.client.ZeebeClient;
import io.camunda.zeebe.client.api.response.ProcessInstanceEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ProcessController {

    @Autowired
    private ZeebeClient zeebeClient;

    @Autowired
    private CamundaOperateClient operateClient;

    @PostMapping("/process")
    public ProcessInstanceEvent createProcess(@RequestBody Map<String, Object> processVariables) {
        ProcessInstanceEvent processInstanceEvent = zeebeClient.newCreateInstanceCommand().bpmnProcessId("Process1").latestVersion().variables(processVariables)
                .send().join();
        return processInstanceEvent;
    }

    @GetMapping("/processes")
    public List<ProcessInstance> getProcesses() throws OperateException {
        return operateClient.searchProcessInstances(new SearchQuery());
    }

}
