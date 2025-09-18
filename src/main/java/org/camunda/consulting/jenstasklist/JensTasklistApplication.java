package org.camunda.consulting.jenstasklist;

import io.camunda.zeebe.client.ZeebeClient;
import io.camunda.zeebe.client.ZeebeClientBuilder;
import io.camunda.zeebe.client.impl.ZeebeClientBuilderImpl;
import io.camunda.zeebe.spring.client.annotation.Deployment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.util.Map;

@SpringBootApplication
//@Deployment(resources = "classpath*:/models/*.bpmn")
public class JensTasklistApplication {

    public static void main(String[] args) {
        SpringApplication.run(JensTasklistApplication.class, args);
    }

    @Component
    @Slf4j
    public static class Initializer implements CommandLineRunner {

        @Override
        public void run(String... args) throws Exception {
            ZeebeClientBuilder zeebeClientBuilder = new ZeebeClientBuilderImpl();
            ZeebeClient zeebeClient = zeebeClientBuilder
                    .restAddress(URI.create("http://localhost:8080"))
                    .grpcAddress(URI.create("http://localhost:26500"))
                    .usePlaintext()
                    .preferRestOverGrpc(false)
                    .withChainHandlers(
                            (request, producer, scope, chain, callback) -> {
                                request.setHeader("Cookie", "OPERATE-SESSION=F614998185D7F90B7204A97EB139927A");
                                chain.proceed(request, producer, scope, callback);
                            }).build();

            log.info(".... Zeebe Client built.");
            log.info(".... now creating instances");

            zeebeClient.
                    newCreateInstanceCommand().bpmnProcessId("Process1").latestVersion()
                    .variables(Map.of("assignee1", "manu", "assignee2", "jens", "creationTimestamp", System.currentTimeMillis()))
                    .send()
                    .join();
            log.info(".... instance 1 created!");

            zeebeClient.newCreateInstanceCommand().bpmnProcessId("Process2").latestVersion()
                    .variables(Map.of("assignee1", "jens", "assignee2", "jens", "creationTimestamp", System.currentTimeMillis()))
                    .send()
                    .join();
            log.info(".... instance 2 created!");
        }

    }
}
