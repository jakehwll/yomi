ARG PLATFORM='linux/amd64'

# ┌──────────────────────────────┐
# │ DEPENDENCIES --------------- │
# └──────────────────────────────┘
FROM --platform=${PLATFORM} node:16-alpine AS deps

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
FROM --platform=${PLATFORM} node:16-alpine AS builder
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
FROM --platform=${PLATFORM} node:16-alpine AS runner

# Add a group and user for permission management.
RUN addgroup --system --gid 1001 yomi
RUN adduser --system --uid 1001 yomi

# Create a directory to run our app inside of.
WORKDIR /app
RUN chown yomi:yomi /app

# Add libc6-compat so we can run `.bin` code.
RUN apk add libc6-compat

# Don't use source-maps or non-minified code.
ENV NODE_ENV production
ENV DOCKER_ENV production
ENV DATABASE_URL "file:./prod.db"

# Copy configuration and static-files and dependencies list to app.
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy build-time generated code to application.
COPY --from=builder --chown=yomi:yomi /app/.next/standalone ./
COPY --from=builder --chown=yomi:yomi /app/.next/static ./public
COPY --from=builder --chown=yomi:yomi /app/.next/static ./.next/static

# Copy prisma modules and configuration to the app as next wont export these.
COPY --from=builder --chown=yomi:yomi /app/node_modules/.bin ./node_modules/.bin
COPY --from=builder --chown=yomi:yomi /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=yomi:yomi /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=yomi:yomi /app/prisma ./prisma

# Copy our startup script.
COPY ./docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

# Expose our application to be ran by docker.
USER yomi
ENV LOCAL_PORT 3000
EXPOSE $LOCAL_PORT

CMD "./docker-entrypoint.sh"