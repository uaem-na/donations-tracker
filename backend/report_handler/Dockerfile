FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]