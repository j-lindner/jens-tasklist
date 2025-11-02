# Tasklist Example

Start 8.8 via docker-compose
```bash
docker-compose -f ./platform/docker-compose-88.yaml up 
```

Create process instance
```bash
curl -v -X POST "http://localhost:8081/api/process" -d '{}' -H 'Content-Type: application/json'                                                                                 
```





This project contains a very small and not very good looking example of an Angular Tasklist for C8.
This is the most Frontend Code I've written in the last decade, so everything is pretty clumsy, but APIs can be called and UIs rendered based on formKeys :-)
I hope to make this more sophisticated in the near future, if time permits.


## Retrieve Cookie from C8Run
```bash
curl --request POST 'http://localhost:8080/api/login?username=demo&password=demo' \
--cookie-jar cookie.txt
```

## Query Operate via facade
```bash
curl localhost:8081/api/processes
```

## Query Tasklist via facade
```bash
curl localhost:8081/api/tasks
```
