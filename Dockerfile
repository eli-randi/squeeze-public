FROM node:16.3.0-alpine

WORKDIR /app

COPY package.json .

RUN npm config set legacy-peer-deps true

RUN npm install

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

CMD ["npm", "start"]
