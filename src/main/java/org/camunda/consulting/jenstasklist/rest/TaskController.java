package org.camunda.consulting.jenstasklist.rest;

import io.camunda.client.CamundaClient;
import io.camunda.client.api.search.filter.UserTaskFilter;
import io.camunda.client.api.search.filter.VariableValueFilter;
import io.camunda.client.api.search.response.UserTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private CamundaClient client;

    @GetMapping("/tasks")
    public List<UserTask> getTasks() {
//        System.out.println("GET ALL TASKS NOW");
        return client.newUserTaskSearchRequest().send().join().items();
    }

    @GetMapping("/tasks-var1-val1")
    public List<UserTask> getTasksVar1Val1() {
//        System.out.println("GET TASKS WITH VAR1=VAL1 NOW");
        List<Consumer<VariableValueFilter>> consumer = List.of(
                c -> c.name("var1").value("\"val1\""));

        List<UserTask> items = client.newUserTaskSearchRequest()
                .filter( f-> f.processInstanceVariables(consumer))
                .send().join().items();

        System.out.println("items: " + items.size());
        System.out.println();
        return items;
    }

    @GetMapping("/tasks-assigned-manu")
    public List<UserTask> getTasksAssignee() {
//        System.out.println("RETRIEVE MANU TAKS NOW");
        return client.newUserTaskSearchRequest().filter(
                        (f) -> f.assignee("manu"))
                .send().join().items();
    }

}
