FROM node:12.8.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src .

EXPOSE 3333

CMD [ "node", "server.js" ]
