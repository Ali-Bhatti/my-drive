FROM node:14-alpine

WORKDIR /web-app

ENV PATH /web-app/node_modules/.bin:$PATH

COPY package*.json .

RUN npm install

RUN npm install @vue/cli -g

CMD ["npm", "run", "serve"]