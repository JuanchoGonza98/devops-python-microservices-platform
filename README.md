# DevOps Python Microservices Platform

A microservices-based e-commerce platform built with Python, designed to demonstrate a full end-to-end DevOps workflow using modern software engineering practices.

> This project serves as a professional portfolio, covering backend development, containerization, Kubernetes, CI/CD, GitOps, and cloud infrastructure.

---

## Architecture Overview

The platform is composed of independent Python microservices, an Nginx gateway, and a lightweight frontend. All traffic is routed through the gateway, which forwards requests to the appropriate internal service.

```
                        ┌─────────────┐
                        │   frontend  │
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │   gateway   │  (Nginx — port 8080)
                        └──────┬──────┘
            ┌──────────┬───────┼───────┬──────────┐
            │          │       │       │          │
     ┌──────▼──┐ ┌─────▼──┐ ┌─▼──────┐ ┌────────▼──┐
     │products │ │ users  │ │payments│ │  orders   │
     │ :8001   │ │ :8002  │ │ :8003  │ │   :8004   │
     └─────────┘ └────────┘ └────────┘ └───────────┘
```

---

## Services

| Service             | Port   | Responsibility                        |
|---------------------|--------|---------------------------------------|
| `gateway`           | `8080` | Entry point — routes traffic via Nginx |
| `products-service`  | `8001` | Product catalog                       |
| `users-service`     | `8002` | User registration and lookup          |
| `payments-service`  | `8003` | Payment processing simulation         |
| `orders-service`    | `8004` | Order creation and consultation       |
| `frontend-web`      | —      | Lightweight web interface             |

---

## Repository Structure

```text
.
├── services/                  # Backend microservices
│   ├── products-service/
│   ├── users-service/
│   ├── payments-service/
│   └── orders-service/
├── gateway/                   # Nginx gateway (Dockerfile + config)
├── frontend-web/              # Web frontend
├── deploy/
│   ├── docker-compose/        # Local stack definition
│   ├── kubernetes/            # Kustomize base and overlays
│   │   ├── base/
│   │   └── overlays/minikube/
│   └── terraform/             # Cloud infrastructure (WIP)
├── docs/
│   ├── architecture/          # System design and diagrams
│   ├── decisions/             # Architecture Decision Records (ADRs)
│   ├── runbooks/              # Operational runbooks
│   └── portfolio/
├── scripts/                   # Utility and automation scripts
├── .github/workflows/         # GitHub Actions CI pipeline
└── Makefile                   # Developer workflow automation
```

---

## Getting Started

### Prerequisites

- Docker and Docker Compose
- `make`
- `kubectl` and Minikube *(for Kubernetes workflows)*

### Run the Full Stack Locally

```bash
make compose-up
```

### Validate the Gateway

```bash
make gateway-test
```

Or manually:

```bash
curl http://127.0.0.1:8080/health
curl http://127.0.0.1:8080/products
curl http://127.0.0.1:8080/users
curl http://127.0.0.1:8080/payments
curl http://127.0.0.1:8080/orders
```

---

## Makefile Targets

| Target                    | Description                                     |
|---------------------------|-------------------------------------------------|
| `make help`               | List all available targets                      |
| `make compose-up`         | Build and start the full Docker Compose stack   |
| `make compose-down`       | Stop and remove containers                      |
| `make compose-logs`       | Stream logs from all services                   |
| `make compose-ps`         | Show running containers                         |
| `make compose-build`      | Rebuild all service images                      |
| `make gateway-test`       | Run curl tests against the gateway              |
| `make k8s-build-local`    | Build images inside Minikube's Docker daemon    |
| `make k8s-apply-minikube` | Apply Kubernetes manifests via Kustomize        |
| `make k8s-status`         | Show pod, service, and deployment status        |
| `make k8s-url`            | Display the Minikube gateway URL                |
| `make k8s-test-gateway`   | Test the gateway through Minikube               |
| `make k8s-restart`        | Restart all deployments                         |
| `make k8s-delete-minikube`| Delete the Kubernetes deployment                |

---

## Roadmap

| Phase                        | Status      |
|------------------------------|-------------|
| Project foundation           | Done        |
| Functional and technical design | Done     |
| Local development            | Done        |
| Docker Compose               | Done        |
| Kubernetes (Minikube)        | Done        |
| CI with GitHub Actions       | Done        |
| GitOps with Argo CD          | In progress |
| Infrastructure with Terraform| Upcoming    |
| Cloud deployment on AWS      | Upcoming    |

---

## Documentation

| Document | Description |
|---|---|
| [`docs/architecture/overview.md`](docs/architecture/overview.md) | System architecture overview |
| [`docs/decisions/adr-001-monorepo.md`](docs/decisions/adr-001-monorepo.md) | ADR: Monorepo structure rationale |
| [`docs/decisions/adr-002-gitops-argocd.md`](docs/decisions/adr-002-gitops-argocd.md) | ADR: GitOps with Argo CD |
| [`docs/runbooks/docker-compose-local-stack.md`](docs/runbooks/docker-compose-local-stack.md) | Local stack runbook |
| [`docs/runbooks/kubernetes-minikube.md`](docs/runbooks/kubernetes-minikube.md) | Kubernetes Minikube runbook |

---

## Design Principles

- **Simplicity with intent** — no over-engineering, every decision is deliberate
- **Documentation from day one** — architecture, decisions, and operations are always up to date
- **Small, traceable changes** — commits are atomic and meaningful
- **Quality and reproducibility** — the environment is consistent across machines
- **Real portfolio focus** — built to reflect professional engineering standards
