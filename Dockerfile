FROM oven/bun:latest AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

ENV NODE_ENV production

COPY package.json bun.lockb ./
RUN bun install -D @swc/cli @swc/core
RUN bun install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Make sure we've got a certificate for this container to use
RUN \
    if [ -f ".travis/cert.pem" ]; then \
    cp ".travis/cert.pem" "./cert.pem" \
    && echo "Certificate was discovered in Travis folder"; \
    elif [ -f "./cert.pem" ]; then \
    echo "Certificate file was discovered locally."; \
    else echo "No certificate was found!" && exit 1; \
    fi

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN mkdir logs

RUN chown nextjs:nodejs .next
RUN chown nextjs:nodejs logs



# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/cert.pem ./cert.pem


USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV CERT_PATH="./cert.pem"

ARG next_secret
ENV NEXTAUTH_SECRET ${next_secret}

CMD HOSTNAME="0.0.0.0" bun server.js