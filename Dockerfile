ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine3.19

# ENV NODE_ENV production

RUN apk add --no-cache bash

RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY package*.json ./

COPY . .

RUN chmod +x /app/entrypoint.sh && \
    chmod +x /app/wait-for-it.sh

RUN chown -R app:app /app

USER app

RUN npm install