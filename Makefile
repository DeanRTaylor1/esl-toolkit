postgres:
	docker run --name postgres14 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -d postgres:14-alpine

createdb:
	docker exec -it postgres14 createdb --username=root --owner=root esl_toolkit

migrateup:
	db-migrate up

migratedown:
	db-migrate down

dbstatus:
	docker exec -t postgres14 psql -U root -d esl_toolkit -c "\dt"
