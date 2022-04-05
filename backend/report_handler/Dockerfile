FROM node:lts-alpine@sha256:99026ffbfde86092cdcc353f2f879f8d331e1c04c04e7e37cf74961ffe4d156d

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]