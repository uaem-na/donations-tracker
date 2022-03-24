FROM node:lts-alpine@sha256:6e52e0b3bedfb494496488514d18bee7fd503fd4e44289ea012ad02f8f41a312

ENV NODE_ENV=production

COPY ["package-lock.json", "npm-shrinkwrap.json", "package.json", "./"]

WORKDIR /usr/src/app/

RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 7000

CMD ["npm", "start"]
