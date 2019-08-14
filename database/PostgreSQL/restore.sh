#!/usr/bin/env bash

chown -R postgres "$PGDATA"
chmod 700 "$PGDATA"

gosu postgres pg_ctl -D "$PGDATA" -w start

for f in /tmp/dumps/*; do
  gosu postgres psql -U postgres -d protheus -f "$f"
done

gosu postgres pg_ctl -D "$PGDATA" -m fast -w stop -s

#cp -r $PGDATA/ /tmp/db
# rm -rf /tmp/dumps
