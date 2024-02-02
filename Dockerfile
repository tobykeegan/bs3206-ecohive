FROM oven/bun:latest 

WORKDIR /app

COPY .next .next

RUN mv .next/static .next/standalone/.next/static

ENV NODE_ENV production

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

WORKDIR /app/.next/standalone

CMD [ "bun", "server.js" ]
