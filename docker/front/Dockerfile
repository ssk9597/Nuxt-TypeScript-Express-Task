FROM node:14.15.3-alpine
WORKDIR /app

RUN apk update

COPY ./frontend/package*.json ./
RUN yarn install

ENV HOST 0.0.0.0
EXPOSE 3000

CMD yarn dev