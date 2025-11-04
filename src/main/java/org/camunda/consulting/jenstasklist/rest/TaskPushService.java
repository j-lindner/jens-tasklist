package org.camunda.consulting.jenstasklist.rest;

import com.example.JensExternalUserTask;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.concurrent.ConcurrentHashMap;


@Service
public class TaskPushService {
    private final ConcurrentHashMap<String, Sinks.Many<JensExternalUserTask>> userSinks = new ConcurrentHashMap<>();

    public Flux<JensExternalUserTask> createUserFlux(String userId) {
        Sinks.Many<JensExternalUserTask> sink = Sinks.many().replay().all();
        userSinks.put(userId, sink);
        return sink.asFlux().doFinally(signalType -> userSinks.remove(userId));
    }

    public void pushTaskForUser(String userId, JensExternalUserTask userTask) {
        Sinks.Many<JensExternalUserTask> sink = userSinks.get(userId);
        if (sink != null) {
            sink.tryEmitNext(userTask);
        }
    }
}
