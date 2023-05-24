# name the stage as "builder"
FROM node:lts-alpine AS builder

# get argument for backend url
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# set working directory for building the react app
WORKDIR /app

# ENV PATH="./node_modules/.bin:$PATH"

# copy node module specs
COPY package.json package-lock.json ./

# install node modules
RUN npm pkg delete scripts.prepare && npm ci --omit=dev

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
COPY nginx.conf /etc/nginx/conf.d/configfile.template

# copy static assets from "builder" stage
COPY --from=builder /app/build .

ENV REACT_DOCKER_PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$REACT_DOCKER_PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
