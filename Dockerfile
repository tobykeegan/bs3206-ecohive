FROM oven/bun:latest 

WORKDIR /app

COPY .next .next

ENV NODE_ENV production

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD [ "bun", ".next/standalone/server.js" ]
