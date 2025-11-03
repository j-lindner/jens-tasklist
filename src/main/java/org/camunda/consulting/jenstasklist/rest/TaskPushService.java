package org.camunda.consulting.jenstasklist.rest;

import io.camunda.client.api.response.UserTaskProperties;
import io.camunda.client.impl.response.UserTaskPropertiesImpl;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
public class TaskPushService {

    private Sinks.Many<UserTaskProperties> sink;
    private Flux<UserTaskProperties> streamTaskUpdates;

    @PostConstruct
    public void init() {
        // Use replay sink to buffer all events for new subscribers
        sink = Sinks.many().replay().all();
        streamTaskUpdates = sink.asFlux();
    }

    public void pushTask(UserTaskProperties userTaskProperties) {
        var result = sink.tryEmitNext(userTaskProperties);
        System.out.println("pushTask called with: " + userTaskProperties + ", emit result: " + result);
    }

    public Flux<UserTaskProperties> getFlux() {
        // If no subscribers, keep the connection open by emitting heartbeat events
        return streamTaskUpdates;
//                .mergeWith(
//            Flux.interval(java.time.Duration.ofSeconds(10))
//                .map(i -> new UserTaskPropertiesImpl(x))
//        );
    }
}
