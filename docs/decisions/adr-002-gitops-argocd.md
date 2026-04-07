# ADR-002: GitOps with Argo CD as the Continuous Delivery Strategy

## Status

Accepted

---

## Context

The platform is deployed on Kubernetes and aims to align with modern operational and continuous delivery practices.

A traditional imperative deployment approach (e.g., `kubectl apply` triggered directly from CI) is simple to start with but introduces several problems at scale: lack of audit trail, manual intervention risk, no automatic drift detection, and harder rollback.

The project needs a CD strategy that is **declarative, auditable, and recoverable by default**.

---

## Decision

Continuous Delivery will follow a **GitOps model using Argo CD**.

The responsibilities are split as follows:

### CI Pipeline (GitHub Actions)

Responsible for everything up to producing a deployable artifact:

- Validate code quality (linting, static analysis)
- Run automated tests
- Build Docker images
- Push images to a container registry
- Update the image tag in the GitOps manifests

### Argo CD

Responsible for cluster reconciliation:

- Continuously observe the desired state declared in Git
- Detect any drift between the desired state and the live cluster
- Automatically (or manually, depending on configuration) synchronize the cluster to match Git

---

## Rationale

GitOps with Argo CD is chosen because:

- **Git becomes the single source of truth** — every deployment is a traceable commit.
- **Full audit trail** — who changed what, when, and why is always recorded.
- **Automatic drift detection** — any manual or accidental change to the cluster is detected and can be corrected.
- **Simplified rollback** — reverting a deployment is as simple as reverting a Git commit.
- **Separation of concerns** — CI handles code quality and artifact production; CD handles cluster state.
- **High portfolio value** — GitOps is a core practice in modern DevOps, Platform Engineering, and SRE roles.

---

## Consequences

### Positive

- Greater operational clarity — the cluster state is always traceable to a Git commit.
- Cleaner separation between the CI and CD phases.
- Enables progressive delivery patterns (canary, blue/green) in future iterations.
- Rollback is a first-class operation.

### Negative

- Adds a conceptual layer that requires understanding the GitOps model.
- Requires discipline in managing environment-specific manifests and image tag updates.
- Argo CD must be installed and maintained as part of the cluster setup.

---

## Target Delivery Flow

```
  Developer pushes code
         │
         ▼
  ┌─────────────────┐
  │  GitHub Actions │  ← lint → test → build → push image
  └────────┬────────┘
           │  updates image tag in GitOps manifests
           ▼
  ┌─────────────────┐
  │   Git (source   │  ← desired state
  │   of truth)     │
  └────────┬────────┘
           │  Argo CD detects drift
           ▼
  ┌─────────────────┐
  │    Argo CD      │  ← syncs cluster to desired state
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │   Kubernetes    │  ← live cluster matches Git
  └─────────────────┘
```

---

## Future Considerations

- A **dedicated GitOps repository** may be introduced to separate application source code from deployment manifests, following the recommended Argo CD pattern for production environments.
- **Application Sets** and **multi-environment promotion** (dev → staging → prod) can be layered on top of this foundation without changing the core strategy.
