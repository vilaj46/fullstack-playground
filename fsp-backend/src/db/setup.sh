#!/bin/bash

# Wait for PostgreSQL to be ready
# until pg_isready -U postgres -d fsp-db; do
#   echo "Waiting for PostgreSQL..."
#   sleep 2
# done


echo "Running database migrations..."
psql -U postgres -d fsp-db -f /app/fsp-backend/src/db/migrations/create_tables.sql

echo "Seeding database with initial data..."
psql -U postgres -d fsp-db -f /app/fsp-backend/src/db/seeds/seed_tables.sql

echo "Database setup complete!"

