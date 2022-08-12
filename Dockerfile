FROM --platform=linux/amd64 node:16-alpine

RUN apk --no-cache add --virtual builds-deps build-base python3

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN npx prisma generate
RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]