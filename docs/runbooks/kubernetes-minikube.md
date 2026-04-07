# Kubernetes Local Deployment with Minikube

> This runbook documents both the manual Kubernetes workflow and the recommended Makefile-based workflow for local operations.

## Objective

Deploy the DevOps Python Microservices Platform on Minikube using a reusable Kubernetes base and a dedicated Minikube overlay.

---

## Current Structure

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

---

## Prerequisites

- Docker installed
- `kubectl` installed
- Minikube installed
- Images built and available in the Minikube environment, or already present locally depending on the driver used

---

## Namespace

The platform is deployed into the following namespace:

```text
devops-platform
```

---

## Services Included

| Service            | Port |
|--------------------|------|
| `products-service` | 8001 |
| `users-service`    | 8002 |
| `payments-service` | 8003 |
| `orders-service`   | 8004 |
| `gateway`          | 8080 |

---

## Exposure Model

### Base

The Kubernetes base uses:

- `ClusterIP` for all internal services
- `ClusterIP` for the gateway by default

### Minikube Overlay

The Minikube overlay patches the gateway service to:

- `type: NodePort`
- `nodePort: 30080`

This keeps the base reusable and leaves environment-specific exposure to the overlay.

---

## Deploy on Minikube

### 1. Start Minikube

```bash
minikube start
```

### 2. Build Images Inside Minikube

If using the Docker driver, point your shell to Minikube's Docker daemon:

```bash
eval $(minikube docker-env)
```

Build all required images:

```bash
docker build -t devops-products-service:local services/products-service
docker build -t devops-users-service:local services/users-service
docker build -t devops-payments-service:local services/payments-service
docker build -t devops-orders-service:local services/orders-service
docker build -t devops-gateway:local -f gateway/Dockerfile .
```

### 3. Review Rendered Manifests

Base:

```bash
kubectl kustomize deploy/kubernetes/base
```

Minikube overlay:

```bash
kubectl kustomize deploy/kubernetes/overlays/minikube
```

### 4. Apply the Minikube Overlay

```bash
kubectl apply -k deploy/kubernetes/overlays/minikube
```

---

## Verification

### Check Namespace Resources

```bash
kubectl get all -n devops-platform
```

### Check Deployments

```bash
kubectl get deploy -n devops-platform
kubectl rollout status deployment/gateway -n devops-platform
kubectl rollout status deployment/products-service -n devops-platform
kubectl rollout status deployment/users-service -n devops-platform
kubectl rollout status deployment/payments-service -n devops-platform
kubectl rollout status deployment/orders-service -n devops-platform
```

### Check Services

```bash
kubectl get svc -n devops-platform
```

Expected:

- Internal services as `ClusterIP`
- Gateway as `NodePort`
- Gateway exposed on port `30080`

### Check Pods

```bash
kubectl get pods -n devops-platform
```

---

## Access the Application

### Gateway Through Minikube IP

```bash
minikube ip
```

Expected access URL:

```
http://<MINIKUBE_IP>:30080
```

Example:

```
http://192.168.49.2:30080
```

### Quick Validation

```bash
curl -I http://$(minikube ip):30080
```

Expected response:

```
HTTP/1.1 200 OK
```

---

## Troubleshooting

### Gateway Not Reachable

Check the gateway service:

```bash
kubectl get svc gateway -n devops-platform -o yaml
```

Confirm:

- `type: NodePort`
- `nodePort: 30080`

### Pod Not Becoming Ready

Describe the pod:

```bash
kubectl describe pod <pod-name> -n devops-platform
```

Check logs:

```bash
kubectl logs <pod-name> -n devops-platform
```

### Rollout Stuck

Inspect deployment status:

```bash
kubectl rollout status deployment/<deployment-name> -n devops-platform
kubectl describe deployment <deployment-name> -n devops-platform
```

---

## Cleanup

Delete the platform from Minikube:

```bash
kubectl delete -k deploy/kubernetes/overlays/minikube
```

Or destroy the whole cluster:

```bash
minikube delete
```

---

## Recommended Workflow with Makefile

For daily local work, use the Makefile targets instead of running all commands manually.

### Available Targets

| Target                   | Description                          |
|--------------------------|--------------------------------------|
| `make k8s-build-local`   | Build local images in Minikube       |
| `make k8s-apply-minikube`| Deploy to Minikube                   |
| `make k8s-status`        | Check platform status                |
| `make k8s-url`           | Show gateway URL                     |
| `make k8s-test-gateway`  | Test gateway availability            |
| `make k8s-restart`       | Restart all deployments              |
| `make k8s-delete-minikube`| Delete the deployment               |

---

## Notes

- The Kubernetes base is environment-agnostic.
- The Minikube overlay is responsible only for local exposure concerns.
- This structure is ready to evolve into additional overlays such as:
  - `dev`
  - `staging`
  - `prod`
