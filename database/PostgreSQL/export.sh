#!/usr/bin/env bash

chown -R postgres "$PGDATA"
chmod 700 "$PGDATA"

gosu postgres pg_ctl -D "$PGDATA" -w start

gosu pg_dump --table=sx2990 protheus -U postgres > /tmp/dumps/sx2.sql
gosu pg_dump --table=six990 protheus -U postgres > /tmp/dumps/six.sql
gosu pg_dump --table=sx6990 protheus -U postgres > /tmp/dumps/sx6.sql
gosu pg_dump --table=sx3990 protheus -U postgres > /tmp/dumps/sx3.sql