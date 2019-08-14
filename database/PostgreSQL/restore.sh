#!/usr/bin/env bash

#chown -R postgres "$PGDATA"
#chmod 700 "$PGDATA"

#su postgres

#su postgres pg_ctl -D "$PGDATA" -m fast -w stop -s
echo 'Iniciando servidor Postgre...'
#su postgres pg_ctl -D "$PGDATA" -w start


echo 'Importando tabelas'
ls -lhs /tmp/dumps/*.sql

for f in /tmp/dumps/*.sql; do
  psql -U postgres -d protheus -f "$f"
  #su postgres psql -U postgres -d protheus -f "$f"
done

#su postgres pg_ctl -D "$PGDATA" -m fast -w stop -s

#cp -r $PGDATA/ /tmp/db
#rm -rf /tmp/dumps
