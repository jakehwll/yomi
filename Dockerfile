
# ┌──────────────────────────────┐
# │ DEPENDENCIES --------------- │
# └──────────────────────────────┘
FROM --platform=linux/amd64 node:16-alpine AS deps

# Install build/python dependencies for `sharp`.
RUN apk --no-cache add --virtual builds-deps build-base python3
WORKDIR /app

# Install yarn-related dependencies
COPY package.json yarn.lock ./
RUN yarn install --production && yarn cache clean

# Remove unused/unneeded APK dependencies.
RUN apk del builds-deps build-base python3

# ┌──────────────────────────────┐
# │ BUILDER -------------------- │
# └──────────────────────────────┘
FROM --platform=linux/amd64 node:16-alpine AS builder
WORKDIR /app

# Copy installed `node_modules` and app source.
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate a `prisma`-orm build and then build app source.
RUN npx prisma generate
RUN yarn build

# ┌──────────────────────────────┐
# │ RUNNER --------------------- │
# └──────────────────────────────┘
FROM --platform=linux/amd64 node:16-alpine AS runner
WORKDIR /app

# Add libc6-compat so we can run `.bin` code.
RUN apk add libc6-compat

# Don't use source-maps or non-minified code.
ENV NODE_ENV production

# Add a group and user for permission management.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 yomi

# Copy configuration and static-files and dependencies list to app.
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy build-time generated code to application.
COPY --from=builder --chown=yomi:nodejs /app/.next/standalone ./
COPY --from=builder --chown=yomi:nodejs /app/.next/static ./public
COPY --from=builder --chown=yomi:nodejs /app/.next/static ./.next/static

# Copy prisma modules and configuration to the app as next wont export these.
COPY --from=builder --chown=yomi:nodejs /app/node_modules/.bin ./node_modules/.bin
COPY --from=builder --chown=yomi:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=yomi:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=yomi:nodejs /app/prisma ./prisma

# Expose our application to be ran by docker.
USER yomi
EXPOSE 3000
ENV PORT 3000

# ENTRYPOINT ["node", "server.js"]
ENTRYPOINT ["yarn", "start:server"]