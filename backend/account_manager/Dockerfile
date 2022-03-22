FROM node:lts-alpine@sha256:0e071f3c5c84cffa6b1035023e1956cf28d48f4b36e229cef328772da81ec0c5

ENV NODE_ENV=production

COPY ["package-lock.json", "npm-shrinkwrap.json", "package.json", "./"]

WORKDIR /usr/src/app/

RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

