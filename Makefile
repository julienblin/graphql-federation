SHELL := bash
.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

PROJECTS = countries covid19 gateway population

.PHONY: install
install: ## Install packages for all projects
	@for project in $(PROJECTS); do yarn --cwd /workspace/projects/$$project; done && yarn

.PHONY: build
build: ## Build all projects
	@parallel --ungroup yarn --cwd /workspace/projects/{} build ::: $(PROJECTS)

.PHONY: checks
checks: ## Run checks for all projects
	@parallel --ungroup yarn --cwd /workspace/projects/{} checks ::: $(PROJECTS)

.PHONY: test
test: ## Run tests for all projects
	@parallel --ungroup -j`wc -w <<< "$(PROJECTS)"` yarn -s --cwd /workspace/projects/{} test ::: $(PROJECTS)

.PHONY: start
start: ## Start all projects
	@parallel --ungroup -j`wc -w <<< "$(PROJECTS)"` yarn -s --cwd /workspace/projects/{} start ::: $(PROJECTS)
	
