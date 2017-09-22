FROM node:4

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
ADD package.json /src/package.json
RUN npm install

#ADD app/nodemon.json /src/nodemon.json

EXPOSE 3000

CMD nodemon index.js