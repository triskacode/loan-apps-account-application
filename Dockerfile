FROM node:16.18.0-slim as build

RUN npm i -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build && \
    pnpm prune --prod

FROM node:16.18.0-slim as deploy

WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/dist/ ./dist/

ENV NODE_ENV production

CMD [ "npm", "run", "start:prod" ]