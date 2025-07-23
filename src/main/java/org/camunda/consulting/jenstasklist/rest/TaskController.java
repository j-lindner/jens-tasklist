package org.camunda.consulting.jenstasklist.rest;

import io.camunda.tasklist.CamundaTaskListClient;
import io.camunda.tasklist.dto.Task;
import io.camunda.tasklist.dto.TaskList;
import io.camunda.tasklist.dto.TaskSearch;
import io.camunda.tasklist.exception.TaskListException;
import io.camunda.tasklist.generated.model.TaskByVariables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private CamundaTaskListClient taskListClient;

    @GetMapping("/tasks")
    public List<Task> getTasks() throws TaskListException {
        TaskSearch x = new TaskSearch();
        TaskList tasks = taskListClient.getTasks(new TaskSearch());
        return tasks.getItems();
    }

    @GetMapping("/tasks-var1-val1")
    public List<Task> getTasksVar1Val1() throws TaskListException {
        List<TaskByVariables> x = List.of(new TaskByVariables().name("var1").operator(TaskByVariables.OperatorEnum.EQ).value("\"val1\""));
        TaskList tasks = taskListClient.getTasks(new TaskSearch().setTaskVariables(x));
        return tasks.getItems();
    }

    @GetMapping("/tasks-assigned-manu")
    public List<Task> getTasksAssignee() throws TaskListException {
        TaskList tasks = taskListClient.getTasks(new TaskSearch().setAssignee("manu"));
        return tasks.getItems();
    }

}
