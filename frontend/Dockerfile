FROM node:lts-alpine

WORKDIR /app

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm ci --only=production
RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000