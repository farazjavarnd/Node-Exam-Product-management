# Build Kubernetes Cluster

1. We have multiple options to create a cluster. In this approach we are using Docker Desktop
2. To use Kubernetes on the local system, we need to enable docker desktop kubernetes feature inside docker desktop settings.

# Deploy node application

There are two ways to deploy this node application.

1. Automated Jenkins pipeline :
   We have setup a declarative jenkins pipeline named as "Jenkinsfile". In order to execute this pipeline we first need to create a job in jenkins UI and then use build now button to execute the pipeline. This pipeline will automatically create the docker image and then it will deploy the kubernetes manifest for the node application.

2. Manually by running the following command:

   1. Build Docker image : to build the Docker image we need to execute the below command
      ```
      docker build . -t faraz/node-application
      ```
   2. Deploy to kubernetes : to deploy the node application to kubernetes we need to execute the below command

      ```
      kubectl apply -f .\kubernetes\application.yaml
      ```

# Application Load Balancing

For understanding how load balancing works in Kubernetes we first need to talk about how the application is getting deployed to Kubernetes.

In kubernetes/application.yaml file we are creating three different kubernetes objects - Deployments, Services & Horizontal Pod Scaler (HPA).

- Deployment - Use to create pods which internally creates the actual node application containers. We can also specify the number of pods we want to run with `replica` setting, here we are creating 2 replicas by default.

- Service - This object does the actual load balancing between multiple pods started by the Deployment objects. We access the node application by connecting to service DNS.

- HPA - This object automatically scales the replica count by observing the CPU load on the pods. For this to work properly we first need to enable metric server by executing below command -

```
kubectl apply -f .\kubernetes\metric-server.yaml
```

# Autoscale Kubernetes Pods based on Load

To see scaling of the node application automatically, we can perform stress testing on the node application pods. We can run the below command which will start many stress pods that will continiously ping our node application multiple times.

```
kubectl apply -f .\kubernetes\stress-testing.yaml
```

This process takes some time and you can observe the pod scaling by executing below commands.

```
kubectl get pods
kubectl get hpa
kubectl top pods
kubectl get pods -n kube-system
```

# Common Docker/kubernetes commands for debugging and maintaining

## Build Image

```
docker build . -t faraz/node-application
docker images
```

## Run container

```
docker run -p 80:3000 -d faraz/node-application
docker ps
docker logs <container-id>
docker exec -it <container-id> /bin/bash
```

## Kubernetes Commands

```
kubectl apply -f <filename>.yaml
kubectl delete -f <filename>.yaml


kubectl get nodes
kubectl get deployments
kubectl get pods
kubectl top pods

kubectl get services


kubectl get services
kubectl logs -f <pod-name>
kubectl get events
```
