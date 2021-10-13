.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: countries-install
countries-install: ## Install packages for countries service.
	yarn --cwd /workspace/projects/countries install

.PHONY: countries-start
countries-start: ## Start services for countries development
	yarn --cwd /workspace/projects/countries start

.PHONY: covid19-install
covid19-install: ## Install packages for covid19 service.
	yarn --cwd /workspace/projects/covid19 install

.PHONY: covid19-start
covid19-start: ## Start services for covid19 development
	yarn --cwd /workspace/projects/covid19 start

.PHONY: docs-start
docs-start: ## Start services for documentation development
	cd /workspace/projects/docs; mkdocs serve

.PHONY: gateway-install
gateway-install: ## Install packages for covid19 service.
	yarn --cwd /workspace/projects/gateway install

.PHONY: gateway-start
gateway-start: ## Start services for gateway development
	yarn --cwd /workspace/projects/gateway start

.PHONY: install
install: countries-install covid19-install gateway-install ## Install packages for all projects

.PHONY: start
start: ## Start all development services
	$(SHELL) $(.SHELLFLAGS) "trap 'kill 0' INT; make countries-start & make covid19-start & make docs-start & make gateway-start"
