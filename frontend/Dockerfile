# name the stage as "builder"
FROM node:lts-alpine AS builder

# set working directory for building the react app
WORKDIR /app

# ENV PATH="./node_modules/.bin:$PATH"

# copy node module specs
COPY package.json package-lock.json ./

# install node modules
RUN npm ci --omit=dev

# copy all files except those in .dockerignore
COPY . .

# create production build of react app
RUN npm run build

# choose NGINX as base image
FROM nginx:stable-alpine

# set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# remove default nginx static assets
RUN rm -rf *

# copy nginx config file
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# copy static assets from "builder" stage
COPY --from=builder /app/build .

# NGINX entry point
ENTRYPOINT ["nginx", "-g", "daemon off;"]
