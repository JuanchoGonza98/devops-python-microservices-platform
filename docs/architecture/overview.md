# Architecture Overview

## Purpose

This document describes the high-level architecture of the DevOps Python Microservices Platform — a portfolio project that demonstrates a full end-to-end DevOps workflow, from local development to cloud deployment.

The goal is not to build a large-scale production system, but to build one serious enough to showcase:

- clear separation of concerns across independent services
- inter-service communication through a gateway
- modern containerization and deployment practices
- Kubernetes-based operation
- GitOps workflows
- reproducible infrastructure

---

## System Components

### Services

| Component           | Port   | Responsibility                                     |
|---------------------|--------|----------------------------------------------------|
| `gateway`           | `8080` | Single entry point — routes traffic via Nginx      |
| `products-service`  | `8001` | Exposes the product catalog                        |
| `users-service`     | `8002` | Handles user registration and lookup               |
| `payments-service`  | `8003` | Simulates payment processing                       |
| `orders-service`    | `8004` | Manages order creation and consultation            |
| `frontend-web`      | —      | Lightweight web interface                          |

### Infrastructure

| Component         | Technology          | Purpose                                      |
|-------------------|---------------------|----------------------------------------------|
| Container runtime | Docker              | Package and run each service in isolation    |
| Local stack       | Docker Compose      | Orchestrate all services locally             |
| Kubernetes        | Minikube (local)    | Container orchestration for staging/prod     |
| Manifest layering | Kustomize           | Base + overlay structure per environment     |
| CI pipeline       | GitHub Actions      | Lint, test, and build on every push          |
| CD strategy       | Argo CD (GitOps)    | Sync desired state from Git to the cluster   |
| Cloud infra       | Terraform + AWS     | Reproducible cloud infrastructure (planned)  |

---

## Request Flow

```
  User / Browser
       │
       ▼
  ┌─────────────┐
  │ frontend-web│
  └──────┬──────┘
         │ HTTP
         ▼
  ┌─────────────┐
  │   gateway   │  port 8080  (Nginx reverse proxy)
  └──────┬──────┘
         │
   ┌─────┼──────────────┬──────────────┐
   │     │              │              │
   ▼     ▼              ▼              ▼
products users       payments       orders
 :8001   :8002        :8003          :8004
```

1. The user interacts with the frontend.
2. The frontend sends requests to the gateway.
3. The gateway routes each request to the appropriate internal service.
4. Each service handles its own domain and responds independently.
5. The `orders-service` may interact with other services as functional needs evolve.

---

## Repository Structure

The project follows a monorepo layout (see [ADR-001](../decisions/adr-001-monorepo.md)):

```text
.
├── services/          # Independent Python microservices
├── gateway/           # Nginx reverse proxy
├── frontend-web/      # Web frontend
├── deploy/
│   ├── docker-compose/    # Local full-stack definition
│   ├── kubernetes/        # Kustomize base + environment overlays
│   └── terraform/         # Cloud infrastructure (planned)
├── docs/
│   ├── architecture/      # System design documents
│   ├── decisions/         # Architecture Decision Records (ADRs)
│   └── runbooks/          # Operational procedures
├── scripts/               # Utility scripts
└── .github/workflows/     # CI pipeline definitions
```

---

## Deployment Environments

The platform is designed to evolve progressively across environments:

| Environment  | Tooling                   | Status         |
|--------------|---------------------------|----------------|
| Local dev    | Python + uvicorn          | Done           |
| Local stack  | Docker Compose            | Done           |
| Kubernetes   | Minikube + Kustomize      | Done           |
| GitOps CD    | Argo CD                   | In progress    |
| Cloud        | Terraform + AWS           | Upcoming       |

---

## Kubernetes Overlay Strategy

Kubernetes manifests use a **base + overlay** pattern via Kustomize:

- **`base/`** — environment-agnostic manifests (deployments, services as `ClusterIP`)
- **`overlays/minikube/`** — patches specific to local Minikube (gateway exposed as `NodePort` on port `30080`)

This structure is ready to extend with additional overlays such as `dev`, `staging`, and `prod` without modifying the base.

---

## CI/CD Pipeline

### Continuous Integration (GitHub Actions)

Triggered on every push and pull request:

1. Lint and static analysis
2. Run unit tests per service (`pytest`)
3. Build Docker images
4. Validate Kubernetes manifests

### Continuous Delivery (Argo CD — planned)

Following the GitOps model (see [ADR-002](../decisions/adr-002-gitops-argocd.md)):

1. A code change is merged.
2. CI validates and builds the new image.
3. GitOps manifests are updated with the new image tag.
4. Argo CD detects the drift and syncs the cluster to the desired state.

---

## Design Principles

- **Simplicity with intent** — every architectural decision is deliberate and justified.
- **Documentation from day one** — architecture, decisions, and operations are always up to date.
- **Small, traceable changes** — commits are atomic, meaningful, and reviewable.
- **Reproducibility** — any engineer can clone and run the full stack locally with a single command.
- **Portfolio-oriented** — built to reflect real professional engineering standards.
