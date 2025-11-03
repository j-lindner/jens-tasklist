package org.camunda.consulting.jenstasklist;

import io.camunda.client.annotation.JobWorker;
import io.camunda.client.api.response.ActivatedJob;
import io.camunda.client.api.response.UserTaskProperties;
import io.camunda.client.api.worker.JobClient;
import org.camunda.consulting.jenstasklist.rest.TaskPushService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TaskPushWorker {

    @Autowired
    private TaskPushService taskPushService;

    @JobWorker(type = "pushTask")
    public void pushTask(ActivatedJob activatedJob, JobClient jobClient) {
        System.out.println("Activating JobWorker");
        UserTaskProperties userTaskProps = activatedJob.getUserTask();
        taskPushService.pushTask(userTaskProps);

        System.out.println("Pushed user task: " + userTaskProps);

        jobClient.newCompleteCommand(activatedJob).send().join();
    }
}
