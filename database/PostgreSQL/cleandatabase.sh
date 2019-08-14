#!/usr/bin/env bash

chown -R postgres "$PGDATA"
chmod 700 "$PGDATA"

echo 'Iniciando servidor Postgre...'
gosu postgres pg_ctl -D "$PGDATA" -w start

echo 'Limpeza das tabelas'
gosu postgres psql -d protheus -f /cleandatabase.sql

cp -r $PGDATA/ /tmp/db