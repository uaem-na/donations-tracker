FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . /app

EXPOSE 7000

CMD ["npm", "start"]
