FROM postgres:11-alpine

ENV POSTGRES_HOST_AUTH_METHOD=trust
RUN echo 'CREATE TABLE "mapping" ("id" VARCHAR PRIMARY KEY, "gateway_id" VARCHAR)' > docker-entrypoint-initdb.d/init.sql
