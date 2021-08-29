FROM node:14.15.3-alpine
WORKDIR /node

RUN apk update && apk add bash

COPY package*.json ./

RUN npm install

EXPOSE 18080

CMD  npm run build && npm run start