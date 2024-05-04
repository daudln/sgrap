#!/bin/bash

# Apply database migrations
echo "Apply database migrations"
npx prisma migrate deploy --preview-feature

# Start server
echo "Starting server"
npm run dev
exec "$@"
