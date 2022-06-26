FROM node:16

WORKDIR /app

ADD package.json .
ADD yarn.lock .

RUN yarn install

COPY . .

RUN npx prisma generate
RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "push-start"]