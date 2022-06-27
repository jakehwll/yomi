FROM node:16

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN npx prisma generate
RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]