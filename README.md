<img src="public/favicon.svg" alt="logo" width="92" height="auto" />

# yomi

[Issues](https://github.com/jakehwll/yomi/issues)</a> · [Getting Started](#getting-started)

## Introduction

Yomi is a Manga/Comic reader hosted on a server so you can read from anywhere.

## Getting Started

> **Note**:
> Yomi is currently in a minimum viable product state. Features and Database schema are likely to change, please do not use in production. [Report issues here](https://github.com/jakehwll/yomi/issues/new).

### Production

**Docker Compose**

```yaml
version: '3'
services:
  app:
    image: ghcr.io/jakehwll/yomi
    restart: unless-stopped
    ports:
      - 3000:3000
    environment:
      - NEXTAUTH_URL=http://CHANGE_ME
      - NEXTAUTH_SECRET=CHANGE_ME
      - DOCKER_ENV=development
    volumes:
      - /path/to/manga:/data/library
      - /path/to/config:/data/config
```

**Docker**

```sh
docker run \
  -e NEXTAUTH_URL=http://CHANGE_ME \
  -e NEXTAUTH_SECRET=CHANGE_ME \
  -e DOCKER_ENV=development \
  -e DATABASE_URL=file:./prod.db \
  -v /path/to/manga:/data/library \
  -v /path/to/config:/data/config \
  -p 3000:3000 \
  ghcr.io/jakehwll/yomi
```

### Development

Preferably, these would be spun up in Docker.

1. Git clone this repo, via. `git clone https://github.com/jakehwll/yomi.git`
2. Copy the contents of `.env.example` to a new file `.env`. Filling accordingly.
3. `yarn install` to install all required dependencies.
4. `yarn prisma generate` to generate the development SQL.
5. `yarn prisma db push` to push the SQL database.
6. `yarn dev` to spin up yomi in Development Mode!

## Contributing

TODO.
