# ===== for dev ===== #
.PHONY: build-dev
build-dev: # build dev container
	docker-compose -f docker/dev/docker-compose.yml build

.PHONY: build-dev-no-cache
build-dev-no-cache: # build dev container with no cache
	docker-compose -f docker/dev/docker-compose.yml build --no-cache

.PHONY: install-deps-dev
install-deps-dev: # update dependencies on running container
	docker-compose -f docker/dev/docker-compose.yml exec web yarn --frozen-lockfile

.PHONY: up-dev
up-dev: # start dev container in detached mode
	docker-compose -f docker/dev/docker-compose.yml up -d

.PHONY: down-dev
down-dev: # stop dev container
	docker-compose -f docker/dev/docker-compose.yml down

# ===== for production ===== #
.PHONY: build
build: # build container
	docker-compose -f docker/production/docker-compose.yml build

.PHONY: build-no-cache
build-no-cache: # build container with no cache
	docker-compose -f docker/production/docker-compose.yml build --no-cache

.PHONY: install-deps
install-deps: # update dependencies on running container
	docker-compose -f docker/production/docker-compose.yml exec web yarn --frozen-lockfile

.PHONY: up
up: # start container in detached mode
	docker-compose -f docker/production/docker-compose.yml up -d

.PHONY: down
down: # stop container
	docker-compose -f docker/production/docker-compose.yml down
