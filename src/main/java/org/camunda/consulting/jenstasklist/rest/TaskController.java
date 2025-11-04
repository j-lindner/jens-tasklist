package org.camunda.consulting.jenstasklist.rest;

import com.example.JensExternalUserTask;
import io.camunda.client.CamundaClient;
import io.camunda.client.api.search.enums.UserTaskState;
import io.camunda.client.api.search.response.UserTask;
import io.camunda.client.api.search.response.Variable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
@Slf4j
public class TaskController {

    @Autowired
    private CamundaClient client;

    @Autowired
    private TaskPushService taskPushService;

    @GetMapping(value = "/task-updates", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<JensExternalUserTask> streamTaskUpdates(@RequestParam String userId) {
        log.info("Received request to stream task updates for user {}", userId);
        return taskPushService.createUserFlux(userId);
    }

    @GetMapping("/tasks")
    public List<UserTask> getTasks() {
        return client.newUserTaskSearchRequest().filter(f -> f.state(UserTaskState.CREATED)).send().join().items();
    }

    @GetMapping("/variables/{userTaskKey}")
    public List<Variable> getVariables(@PathVariable long userTaskKey) {
        return client.newUserTaskVariableSearchRequest(userTaskKey).send().join().items();
    }

    @GetMapping("/tasks/{userTaskKey}")
    public List<UserTask> getTask(@PathVariable long userTaskKey) {
        return client.newUserTaskSearchRequest()
                .filter(f -> f.state(UserTaskState.CREATED).userTaskKey(userTaskKey))
                .send().join().items();
    }

    @PostMapping("/tasks/{userName}/{userTaskKey}")
    public void completeUserTask(@PathVariable String userName, @PathVariable long userTaskKey, @RequestBody Map<String, Object> payload) {
        log.info("COMPLETING USER TAS with userTaskKey {}: {}", userTaskKey, payload);
        client.newCompleteUserTaskCommand(userTaskKey).variables(payload).send().join();
    }


}
