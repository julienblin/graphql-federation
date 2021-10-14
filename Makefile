.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: countries-install
countries-install: ## Install packages for countries service.
	yarn --cwd /workspace/projects/countries install

.PHONY: countries-build
countries-build: ## Build countries service.
	yarn --cwd /workspace/projects/countries build

.PHONY: countries-start
countries-start: ## Start services for countries development
	yarn --cwd /workspace/projects/countries start

.PHONY: covid19-install
covid19-install: ## Install packages for covid19 service.
	yarn --cwd /workspace/projects/covid19 install

.PHONY: covid19-build
covid19-build: ## Build covid19 service.
	yarn --cwd /workspace/projects/covid19 build

.PHONY: covid19-start
covid19-start: ## Start services for covid19 development
	yarn --cwd /workspace/projects/covid19 start

.PHONY: docs-build
docs-build: ## Build docs
	mkdocs build -f /workspace/projects/docs/mkdocs.yml

.PHONY: docs-start
docs-start: ## Start services for documentation development
	mkdocs serve -f /workspace/projects/docs/mkdocs.yml

.PHONY: gateway-install
gateway-install: ## Install packages for covid19 service.
	yarn --cwd /workspace/projects/gateway install

.PHONY: gateway-build
gateway-build: ## Build gateway service.
	yarn --cwd /workspace/projects/gateway build

.PHONY: gateway-start
gateway-start: ## Start services for gateway development
	yarn --cwd /workspace/projects/gateway start

.PHONY: population-install
population-install: ## Install packages for population service.
	yarn --cwd /workspace/projects/population install

.PHONY: population-build
population-build: ## Build population service.

.PHONY: population-start
population-start: ## Start services for population development
	yarn --cwd /workspace/projects/population start

.PHONY: install
install: countries-install covid19-install gateway-install population-install ## Install packages for all projects

.PHONY: build
build: countries-build covid19-build docs-build gateway-build population-build ## Build all services

.PHONY: start
start: ## Start all development services
	trap 'kill 0' INT; make countries-start & make covid19-start & make population-start & make docs-start & sleep 5s && make gateway-start
