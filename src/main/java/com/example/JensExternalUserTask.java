package com.example;

import io.camunda.client.api.response.UserTaskProperties;

import java.util.Map;

public class JensExternalUserTask {
    private final Action action;
    private final String externalFormReference;
    private final UserTaskProperties userTaskProperties;
    private final Map<String, Object> processVariables;

    public JensExternalUserTask(String externalFormReference, UserTaskProperties userTaskProperties, Action action, Map<String, Object> processVariables) {
        this.externalFormReference = externalFormReference;
        this.userTaskProperties = userTaskProperties;
        this.action = action;
        this.processVariables = processVariables;
    }

    public Map<String, Object> getProcessVariables() {
        return processVariables;
    }

    public String getExternalFormReference() {
        return externalFormReference;
    }

    public String getAssignee() {
        return userTaskProperties.getAssignee();
    }

    public long getUserTaskKey() {
        return userTaskProperties.getUserTaskKey();
    }

    public String getAction() {
        return action.name();
    }

    public static enum Action {
        PUSH,
        COMPLETE
    }

}

