# ADR-001: Monorepo as the Initial Repository Strategy

## Status

Accepted

---

## Context

The platform is composed of multiple independent services (microservices, gateway, frontend, infrastructure manifests, and documentation). However, the project is in an early stage where **speed, consistency, and simplicity** take priority over strict organizational boundaries.

At this scale, splitting every component into its own repository would introduce unnecessary coordination overhead without meaningful benefit.

---

## Decision

A **monorepo** will be used to host all components of the platform under a single repository:

- Backend microservices
- Nginx gateway
- Frontend web application
- Kubernetes and Docker Compose deployment manifests
- Terraform infrastructure definitions
- Documentation and runbooks
- Automation scripts

---

## Rationale

A monorepo is the right choice for this project because:

- It **simplifies the initial setup** — a single clone, a single CI pipeline, a single issue tracker.
- It **reduces premature complexity** — no need to manage cross-repository versioning or dependency coordination at this stage.
- It **improves consistency** — all services share the same tooling conventions, directory layout, and documentation standards.
- It **increases visibility** — the full system is observable in one place, which is especially valuable for a portfolio project.
- It is **well-suited for end-to-end demonstration** — changes that span multiple services can be shipped in a single atomic commit.

---

## Consequences

### Positive

- Centralized structure that is easy to navigate and explain.
- Unified documentation and decision records.
- Lower friction at the start — no inter-repo synchronization needed.
- Simpler CI/CD configuration with a single pipeline definition.

### Negative

- The repository grows in size as more components are added.
- A future need to isolate deployment cadences per service may require splitting the repo.

---

## Future Review

As the project matures, the following separations may be evaluated:

- **GitOps repository** — a dedicated repo for Kubernetes manifests and Argo CD configuration, which is a common pattern in production GitOps workflows.
- **Service extraction** — individual service repositories if independent release cycles or team ownership boundaries emerge.

These decisions should be driven by actual complexity, not speculation.
