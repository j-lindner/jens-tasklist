package org.camunda.consulting.jenstasklist;

import io.camunda.client.annotation.JobWorker;
import io.camunda.client.api.response.ActivatedJob;
import io.camunda.client.api.response.UserTaskProperties;
import io.camunda.client.api.worker.JobClient;
import lombok.extern.slf4j.Slf4j;
import org.camunda.consulting.jenstasklist.rest.TaskPushService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class TaskPushWorker {

    @Autowired
    private TaskPushService taskPushService;

    @JobWorker(type = "pushTask")
    public void pushTask(ActivatedJob activatedJob, JobClient jobClient) {
        log.info("Activating job: {}", activatedJob);
        UserTaskProperties userTaskProps = activatedJob.getUserTask();
        taskPushService.pushTask(userTaskProps);

        log.info("Pushed user task: {}", userTaskProps);

        jobClient.newCompleteCommand(activatedJob).send().join();
    }
}
