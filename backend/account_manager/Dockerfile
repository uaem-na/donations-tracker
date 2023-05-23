FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . /app

EXPOSE 5000

CMD ["npm", "start"]

