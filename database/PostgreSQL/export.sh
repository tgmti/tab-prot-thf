#!/usr/bin/env bash

chown -R postgres "$PGDATA"
chmod 700 "$PGDATA"

echo 'Iniciando servidor Postgre...'
gosu postgres pg_ctl -D "$PGDATA" -w start

echo 'Exportando tabelas (sx2, sx3, six, sx6)'
pg_dump protheus -U postgres -h localhost --t sx2990 -t sx3990 -t six990 -t sx6990 > /tmp/dumps/dumpsx.sql

ls -lhs /tmp/dumps