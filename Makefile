.PHONY: help tree check-docs

help:
	@echo "Available targets:"
	@echo "  make help        - Show available commands"
	@echo "  make tree        - Show project structure"
	@echo "  make check-docs  - Verify base documentation exists"

tree:
	@find . -maxdepth 3 | sort

check-docs:
	@test -f README.md || (echo "Missing README.md" && exit 1)
	@test -f docs/architecture/overview.md || (echo "Missing docs/architecture/overview.md" && exit 1)
	@test -f docs/decisions/adr-001-monorepo.md || (echo "Missing ADR 001" && exit 1)
	@test -f docs/decisions/adr-002-gitops-argocd.md || (echo "Missing ADR 002" && exit 1)
	@test -f docs/runbooks/local-development.md || (echo "Missing local-development runbook" && exit 1)
	@echo "Base documentation OK"
