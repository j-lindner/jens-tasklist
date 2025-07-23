package org.camunda.consulting.jenstasklist;

import io.camunda.zeebe.client.ZeebeClient;
import io.camunda.zeebe.spring.client.annotation.Deployment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.Map;

@SpringBootApplication
@Deployment(resources = "classpath*:/models/*.bpmn")
public class JensTasklistApplication {

    @Autowired
    private ZeebeClient zeebeClient;

    public static void main(String[] args) {
        SpringApplication.run(JensTasklistApplication.class, args);
    }

    @Component
    public class Initializer implements CommandLineRunner {

        @Override
        public void run(String... args) throws Exception {
            zeebeClient.newCreateInstanceCommand().bpmnProcessId("Process1").latestVersion()
                    .variables(Map.of("assignee1", "manu", "assignee2", "jens", "creationTimestamp", System.currentTimeMillis()))
                    .send()
                    .join();

            zeebeClient.newCreateInstanceCommand().bpmnProcessId("Process2").latestVersion()
                    .variables(Map.of("assignee1", "jens", "assignee2", "jens", "creationTimestamp", System.currentTimeMillis()))
                    .send()
                    .join();
        }

    }
}
