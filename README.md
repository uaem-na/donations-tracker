# UAEM Donations Tracker Application for McGill UAEM chapter

- [UAEM Donations Tracker Application for McGill UAEM chapter](#uaem-donations-tracker-application-for-mcgill-uaem-chapter)
  - [Project description](#project-description)
  - [Setup](#setup)
    - [Running docker compose](#running-docker-compose)
    - [Running backend and frontend separately](#running-backend-and-frontend-separately)
      - [Backend](#backend)
      - [frontend](#frontend)
  - [Contributors](#contributors)
    - [Coordinators](#coordinators)

## Project description

General-purpose distribution platform developed for the McGill chapter of the Universities Allied for Essential Medicine.

## Setup

### Running docker compose

`docker-compose build && docker-compose up -d`

### Running backend and frontend separately

#### Backend

In the backend folder, install dependencies. 

`npm run install`

Then setup the `.env` file according to `.env.sample`.

Run the project.

`npm run start`

#### frontend

In the frontend folder, install npm dependencies.

`npm run install`

`.env` file is only used for local development. This file is added to `.dockerignore`.

Run the project.

`npm run start`

## Contributors 

[![](https://contrib.rocks/image?repo=uaem-na/donations-tracker)](https://github.com/uaem-na/donations-tracker/graphs/contributors)

Original repository: https://github.com/Lucas44/mcgill-uaem-website

Initial contributors: Lucas Nelson, Edgar Chang, Tristan Stevens, Gaby Le Bideau, Zhekai Jiang

### Coordinators

Yeji Lori Song