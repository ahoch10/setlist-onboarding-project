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

.PHONY: build-api
build-api:
	docker build -t setlist-server ./server

.PHONY: run-api
run-api:
	docker container run \
	--name setlist-server \
	-e FLASK_APP=run.py \
	-p 5000:5000 \
	-v $(PWD)/server:/home/anat/src \
        -v /home/anat/src/.venv \
        setlist-server
