FROM node:12.8.0-alpine    

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src .
COPY src/config/dbconfig.pg.docker.compose.json ./config/dbconfig.json

EXPOSE 3333

CMD [ "node", "server.js" ]
