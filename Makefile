# ===== for dev ===== #
.PHONY: build-dev
build-dev: # build dev container
	docker-compose -f docker/dev/docker-compose.yml build

.PHONY: build-dev-no-cache
build-dev-no-cache: # build dev container with no cache
	docker-compose -f docker/dev/docker-compose.yml build --no-cache

.PHONY: up-dev
up-dev: # start dev container
	docker-compose -f docker/dev/docker-compose.yml up

.PHONY: up-dev-d
up-dev-d: # start dev container in detached mode
	docker-compose -f docker/dev/docker-compose.yml up -d

.PHONY: up-dev-b
up-dev-b: # start dev container after build it
	docker-compose -f docker/dev/docker-compose.yml up --build

.PHONY: up-dev-bd
up-dev-bd: # start dev container in detached mode after build it
	docker-compose -f docker/dev/docker-compose.yml up -d --build

.PHONY: down-dev
down-dev: # stop dev container
	docker-compose -f docker/dev/docker-compose.yml down

# ===== for production ===== #
.PHONY: build-production
build-production: # build production container
	docker-compose -f docker/production/docker-compose.yml build

.PHONY: build-production-no-cache
build-production-no-cache: # build production container with no cache
	docker-compose -f docker/production/docker-compose.yml build --no-cache

.PHONY: up-production
up-production: # start production container
	docker-compose -f docker/production/docker-compose.yml up

.PHONY: up-production-d
up-production-d: # start production container in detached mode
	docker-compose -f docker/production/docker-compose.yml up -d

.PHONY: up-production-b
up-production-b: # start production container after build it
	docker-compose -f docker/production/docker-compose.yml up --build

.PHONY: up-production-bd
up-production-bd: # start production container in detached mode after build it
	docker-compose -f docker/production/docker-compose.yml up -d --build

.PHONY: down-production
down-production: # stop production container
	docker-compose -f docker/production/docker-compose.yml down
