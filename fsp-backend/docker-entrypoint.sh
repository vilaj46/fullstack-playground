#!/bin/sh

until pg_isready -h db -U postgres -d fsp-db; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

echo "Running drizzle-kit push..."
npx drizzle-kit push

if [ "$RUN_SEED" = "true" ]; then
  echo "Running seed script..."
  npx tsx src/db/seed/index.ts
fi

echo "Starting dev server..."
npm run dev