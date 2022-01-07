FROM node:lts-alpine@sha256:0e071f3c5c84cffa6b1035023e1956cf28d48f4b36e229cef328772da81ec0c5

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "npm-shrinkwrap.json", "./"]

RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

