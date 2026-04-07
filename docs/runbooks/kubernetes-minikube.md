# Kubernetes local deployment with Minikube
Obs: This runbook documents both the manual Kubernetes workflow and the recommended Makefile-based workflow for local operations.
## Objective

Deploy the DevOps Python Microservices Platform on Minikube using a reusable Kubernetes base and a dedicated Minikube overlay.

## Current structure

```text
deploy/kubernetes/
├── base
│   ├── namespace.yaml
│   ├── gateway-deployment.yaml
│   ├── gateway-service.yaml
│   ├── orders-deployment.yaml
│   ├── orders-service.yaml
│   ├── payments-deployment.yaml
│   ├── payments-service.yaml
│   ├── products-deployment.yaml
│   ├── products-service.yaml
│   ├── users-deployment.yaml
│   ├── users-service.yaml
│   └── kustomization.yaml
└── overlays
    └── minikube
        └── kustomization.yaml
```
```text
Prerequisites
Docker installed
kubectl installed
Minikube installed
Images built and available in the Minikube environment, or already present locally depending on the driver used
Namespace

The platform is deployed into the following namespace:

devops-platform
Services included
products-service on port 8001
users-service on port 8002
payments-service on port 8003
orders-service on port 8004
gateway on port 8080
Exposure model
Base
```

The Kubernetes base uses:

ClusterIP for all internal services
ClusterIP for the gateway by default
Minikube overlay

The Minikube overlay patches the gateway service to:

type: NodePort
nodePort: 30080

This keeps the base reusable and leaves environment-specific exposure to the overlay.
```text
Deploy on Minikube
1. Start Minikube
```
```code 
minikube start
```
2. Build images inside Minikube

If using the Docker driver, point your shell to Minikube's Docker daemon:
```code
eval $(minikube docker-env)
```
```text
Build all required images:

docker build -t devops-products-service:local services/products-service
docker build -t devops-users-service:local services/users-service
docker build -t devops-payments-service:local services/payments-service
docker build -t devops-orders-service:local services/orders-service
docker build -t devops-gateway:local -f gateway/Dockerfile .
```
3. Review rendered manifests

Base:

kubectl kustomize deploy/kubernetes/base

Minikube overlay:

kubectl kustomize deploy/kubernetes/overlays/minikube
4. Apply the Minikube overlay
kubectl apply -k deploy/kubernetes/overlays/minikube
Verification
Check namespace resources
kubectl get all -n devops-platform
Check deployments
kubectl get deploy -n devops-platform
kubectl rollout status deployment/gateway -n devops-platform
kubectl rollout status deployment/products-service -n devops-platform
kubectl rollout status deployment/users-service -n devops-platform
kubectl rollout status deployment/payments-service -n devops-platform
kubectl rollout status deployment/orders-service -n devops-platform
Check services
kubectl get svc -n devops-platform

Expected:

internal services as ClusterIP
gateway as NodePort
gateway exposed on 30080
Check pods
kubectl get pods -n devops-platform
Access the application
Gateway through Minikube IP
minikube ip

Expected access URL:

http://<MINIKUBE_IP>:30080

Example:

http://192.168.49.2:30080
Quick validation
curl -I http://$(minikube ip):30080

Expected response:

HTTP/1.1 200 OK
Troubleshooting
Gateway not reachable

Check the gateway service:

kubectl get svc gateway -n devops-platform -o yaml

Confirm:

type: NodePort
nodePort: 30080
Pod not becoming ready

Describe the pod:

kubectl describe pod <pod-name> -n devops-platform

Check logs:

kubectl logs <pod-name> -n devops-platform
Rollout stuck

Inspect deployment status:

kubectl rollout status deployment/<deployment-name> -n devops-platform
kubectl describe deployment <deployment-name> -n devops-platform
Cleanup

Delete the platform from Minikube:

kubectl delete -k deploy/kubernetes/overlays/minikube

Or destroy the whole cluster:

minikube delete
Notes
The Kubernetes base is environment-agnostic.
The Minikube overlay is responsible only for local exposure concerns.
This structure is ready to evolve into additional overlays such as:
dev
staging
prod

Luego ejecútalo así:

```bash id="pc4zfx"
git add docs/runbooks/kubernetes-minikube.md
git commit -m "docs: add minikube kubernetes deployment runbook"
git push origin develop

## Recommended workflow with Makefile

For daily local work, use the Makefile targets instead of running all commands manually.

### Build local images in Minikube

```bash
make k8s-build-local

Deploy to Minikube
make k8s-apply-minikube
Check platform status
make k8s-status
Show gateway URL
make k8s-url
Test gateway availability
make k8s-test-gateway
Restart deployments
make k8s-restart
Delete the deployment
make k8s-delete-minikube