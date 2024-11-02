#!/bin/bash

# Apply migrations
npx prisma@5.5.0 migrate dev

exec "$@"
