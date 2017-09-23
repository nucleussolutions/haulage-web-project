FROM mhart/alpine-node:latest

#ADD package.json /tmp/package.json
#RUN cd /tmp && npm install
#RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

#WORKDIR /opt/app
#ADD . /opt/app

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000

#CMD ["npm", "start"]

#CMD nodemon index.js
CMD ["node", "index.js"]
