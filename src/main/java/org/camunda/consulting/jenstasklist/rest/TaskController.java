package org.camunda.consulting.jenstasklist.rest;

import io.camunda.client.CamundaClient;
import io.camunda.client.api.response.UserTaskProperties;
import io.camunda.client.api.search.enums.UserTaskState;
import io.camunda.client.api.search.filter.VariableValueFilter;
import io.camunda.client.api.search.response.UserTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
@Slf4j
public class TaskController {

    @Autowired
    private CamundaClient client;

    @Autowired
    private TaskPushService taskPushService;

    @GetMapping(value = "/task-updates", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<UserTaskProperties> streamTaskUpdates() {
        return taskPushService.getFlux();
    }

    @GetMapping("/tasks")
    public List<UserTask> getTasks() {
        return client.newUserTaskSearchRequest().filter(f -> f.state(UserTaskState.CREATED)).send().join().items();
    }

    @GetMapping("/tasks/{userTaskKey}")
    public List<UserTask> getTask(@PathVariable long userTaskKey) {
        return client.newUserTaskSearchRequest()
                .filter(f -> f.state(UserTaskState.CREATED).userTaskKey(userTaskKey))
                .send().join().items();
    }

    @GetMapping("/tasks-var1-val1")
    public List<UserTask> getTasksVar1Val1() {
        List<Consumer<VariableValueFilter>> consumer = List.of(
                c -> c.name("var1").value("\"val1\""));

        List<UserTask> items = client.newUserTaskSearchRequest()
                .filter(f -> f.processInstanceVariables(consumer).state(UserTaskState.CREATED))
                .send().join().items();

        return items;
    }

    @GetMapping("/tasks-assigned-manu")
    public List<UserTask> getTasksAssignee() {
        return client.newUserTaskSearchRequest().filter(
                        (f) -> f.assignee("manu").state(UserTaskState.CREATED))
                .send().join().items();
    }

    @PostMapping("/tasks/{userTaskKey}")
    public void completeUserTask(@PathVariable long userTaskKey, @RequestBody Map<String, Object> payload) {
        log.info("COMPLETING USER TAS with userTaskKey {}: {}", userTaskKey, payload);
        client.newCompleteUserTaskCommand(userTaskKey).variables(payload).send().join();
    }


}
