# Imagem com um banco PostgreSQL inicializado com a versão 12.1.17
FROM docker.totvs.io/dcp/database

RUN mkdir /tmp/dumps

ADD export.sh /export.sh
RUN ./export.sh

# Conectar no banco e apagar as tabelas que não serão usadas
# RUN psql -U postgres -d protheus -f /cleandatabase.sql
FROM postgres:12-alpine

ENV GOSU_VERSION="1.10"
ENV LANG="pt_BR.CP1252"
#ENV PG_MAJOR="10"
#ENV PG_VERSION="10.5-1.pgdg90+1"
ENV PGDATA="/var/lib/postgresql/data"
ENV TZ="America/Sao_Paulo"
ENV POSTGRES_INITDB_ARGS="-E WIN1252"
ENV POSTGRES_PASSWORD="Totvs@123"
ENV POSTGRES_DB="protheus"

COPY --from=0 /tmp/dumps /tmp/

ADD restore.sh /restore.sh
RUN ./restore.sh

CMD [ "postgres" ]