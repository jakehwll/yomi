#!/bin/sh

# push database schema to sqlite db.
yarn prisma db push >> /app/prisma.log

# update our environment variables.
export NEXTAUTH_URL="${INSTANCE_URL}"
export NEXTAUTH_SECRET="${INSTANCE_SECRET}"

# start the ./server.js
node server.js