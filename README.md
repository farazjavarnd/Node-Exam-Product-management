# Build Image

```
docker build . -t faraz/node-application
docker images
```

# Run container

```
docker run -p 80:3000 -d faraz/node-application
docker ps
docker logs <container-id>
docker exec -it <container-id> /bin/bash
```

Kubernetes cluster -

- Docker
- EKS / Docker Desktop

```
kubectl get nodes
kubectl apply -f <filename>.yaml

kubectl get deployments
kubectl get pods
kubectl get services
kubectl logs -f <pod-name>
kubectl get events
```
