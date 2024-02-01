FROM oven/bun:latest

WORKDIR /usr/src/app

COPY . .

ARG PORT
EXPOSE 3000

ENV NODE_ENV production

CMD [ "bun", "start" ]
