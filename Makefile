.PHONY: help tree check-docs compose-up compose-down compose-logs compose-ps compose-build gateway-test

COMPOSE_FILE=deploy/docker-compose/docker-compose.yml

help:
	@echo "Available targets:"
	@echo "  make help          - Show available commands"
	@echo "  make tree          - Show project structure"
	@echo "  make check-docs    - Verify base documentation exists"
	@echo "  make compose-up    - Start local stack with Docker Compose"
	@echo "  make compose-down  - Stop local stack"
	@echo "  make compose-logs  - Show Docker Compose logs"
	@echo "  make compose-ps    - Show running services"
	@echo "  make compose-build - Rebuild Docker Compose images"
	@echo "  make gateway-test  - Test gateway endpoints"

tree:
	@find . \
		-not -path "./.git*" \
		-not -path "./services/*/.venv*" \
		-not -path "./services/*/__pycache__*" \
		-not -path "./services/*/.pytest_cache*" \
		| sort

check-docs:
	@test -f README.md || (echo "Missing README.md" && exit 1)
	@test -f docs/architecture/overview.md || (echo "Missing docs/architecture/overview.md" && exit 1)
	@test -f docs/decisions/adr-001-monorepo.md || (echo "Missing ADR 001" && exit 1)
	@test -f docs/decisions/adr-002-gitops-argocd.md || (echo "Missing ADR 002" && exit 1)
	@test -f docs/runbooks/local-development.md || (echo "Missing local-development runbook" && exit 1)
	@test -f docs/runbooks/docker-compose-local-stack.md || (echo "Missing docker-compose runbook" && exit 1)
	@echo "Base documentation OK"

compose-up:
	docker compose -f $(COMPOSE_FILE) up --build

compose-down:
	docker compose -f $(COMPOSE_FILE) down

compose-logs:
	docker compose -f $(COMPOSE_FILE) logs -f

compose-ps:
	docker compose -f $(COMPOSE_FILE) ps

compose-build:
	docker compose -f $(COMPOSE_FILE) build

gateway-test:
	@echo "Testing gateway endpoints..."
	@curl -s http://127.0.0.1:8080/health && echo
	@curl -s http://127.0.0.1:8080/products && echo
	@curl -s http://127.0.0.1:8080/users && echo
	@curl -s http://127.0.0.1:8080/payments && echo
	@curl -s http://127.0.0.1:8080/orders && echo
