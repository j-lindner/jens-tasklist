package org.camunda.consulting.jenstasklist.rest;

import io.camunda.client.CamundaClient;
import io.camunda.client.api.response.UserTaskProperties;
import io.camunda.client.api.search.enums.UserTaskState;
import io.camunda.client.api.search.filter.VariableValueFilter;
import io.camunda.client.api.search.response.UserTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.function.Consumer;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private CamundaClient client;

    @Autowired
    private TaskPushService taskPushService;

    @GetMapping(value = "/task-updates", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<UserTaskProperties> streamTaskUpdates() {
//        System.out.println("CALLING TASK_UPDATES");
        return taskPushService.getFlux();
    }

    @GetMapping("/tasks")
    public List<UserTask> getTasks() {
//        System.out.println("GET ALL TASKS NOW");
        return client.newUserTaskSearchRequest().filter(f -> f.state(UserTaskState.CREATED)).send().join().items();
    }

    @GetMapping("/tasks-var1-val1")
    public List<UserTask> getTasksVar1Val1() {
//        System.out.println("GET TASKS WITH VAR1=VAL1 NOW");
        List<Consumer<VariableValueFilter>> consumer = List.of(
                c -> c.name("var1").value("\"val1\""));

        List<UserTask> items = client.newUserTaskSearchRequest()
                .filter(f -> f.processInstanceVariables(consumer).state(UserTaskState.CREATED))
                .send().join().items();

        System.out.println("items: " + items.size());
        System.out.println();
        return items;
    }

    @GetMapping("/tasks-assigned-manu")
    public List<UserTask> getTasksAssignee() {
//        System.out.println("RETRIEVE MANU TAKS NOW");
        return client.newUserTaskSearchRequest().filter(
                        (f) -> f.assignee("manu").state(UserTaskState.CREATED))
                .send().join().items();
    }

}
