FROM node:lts-alpine@sha256:99026ffbfde86092cdcc353f2f879f8d331e1c04c04e7e37cf74961ffe4d156d

WORKDIR /app

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm run build

CMD ["npm", "start"]

# EXPOSE 3000