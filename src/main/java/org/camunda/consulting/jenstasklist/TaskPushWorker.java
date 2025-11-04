package org.camunda.consulting.jenstasklist;

import com.example.JensExternalUserTask;
import io.camunda.client.annotation.JobWorker;
import io.camunda.client.api.response.ActivatedJob;
import io.camunda.client.api.response.UserTaskProperties;
import io.camunda.client.api.worker.JobClient;
import lombok.extern.slf4j.Slf4j;
import org.camunda.consulting.jenstasklist.rest.TaskPushService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Slf4j
public class TaskPushWorker {

    @Autowired
    private TaskPushService taskPushService;

    @JobWorker(type = "pushTask")
    public void pushTask(ActivatedJob activatedJob, JobClient jobClient) {
        log.info("Activating job: {}", activatedJob);
        UserTaskProperties userTaskProps = activatedJob.getUserTask();

        String externalFormRef = activatedJob.getVariable("myExternalFormReference").toString();
        Map<String, Object> processVariables = activatedJob.getVariablesAsMap();

        JensExternalUserTask jensExternalUserTask = new JensExternalUserTask(externalFormRef, userTaskProps, JensExternalUserTask.Action.PUSH, processVariables);
        taskPushService.pushTaskForUser("demo", jensExternalUserTask);

        log.info("Pushed user task: {}", userTaskProps);

        jobClient.newCompleteCommand(activatedJob).send().join();
    }

    @JobWorker(type = "completeTask")
    public void completeTask(ActivatedJob activatedJob, JobClient jobClient) {
        log.info("Completing job: {}", activatedJob);
        UserTaskProperties userTaskProps = activatedJob.getUserTask();

        String externalFormRef = "";
        if( activatedJob.getVariablesAsMap().containsKey("myExternalFormReference")) {
            externalFormRef = activatedJob.getVariable("myExternalFormReference").toString();
        }

        Map<String, Object> processVariables = activatedJob.getVariablesAsMap();
        JensExternalUserTask jensExternalUserTask = new JensExternalUserTask(externalFormRef, userTaskProps, JensExternalUserTask.Action.COMPLETE, processVariables);
        taskPushService.pushTaskForUser("demo", jensExternalUserTask);
        log.info("Completed user task: {}", userTaskProps);

        jobClient.newCompleteCommand(activatedJob).send().join();
    }
}
