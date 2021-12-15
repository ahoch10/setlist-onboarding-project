DB_CONTAINER_NAME = setlist

.PHONY: run-db
run-db:
	docker run --name $(DB_CONTAINER_NAME) -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB=setlist -d -p 5433:5432 postgres

.PHONY: start-db
start-db:
	docker start $(DB_CONTAINER_NAME)

.PHONY: stop-db
stop-db:
	docker stop $(DB_CONTAINER_NAME)
