package org.camunda.consulting.jenstasklist.rest;

import io.camunda.client.CamundaClient;
import io.camunda.client.api.response.ProcessInstanceEvent;
import io.camunda.client.api.search.response.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ProcessController {

    @Autowired
    private CamundaClient client;


    @PostMapping("/process")
    public ProcessInstanceEvent createProcess(@RequestBody Map<String, Object> processVariables) {
        return client.newCreateInstanceCommand().bpmnProcessId("Process1").latestVersion().variables(processVariables)
                .send().join();
    }

    @GetMapping("/processes")
    public List<ProcessInstance> getProcesses() {
         return client.newProcessInstanceSearchRequest().send().join().items();
    }

}
