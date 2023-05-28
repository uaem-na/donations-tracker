# UAEM Donations Tracker Application for McGill UAEM chapter

- [UAEM Donations Tracker Application for McGill UAEM chapter](#uaem-donations-tracker-application-for-mcgill-uaem-chapter)
  - [Project description](#project-description)
  - [Setup](#setup)
    - [Running docker compose](#running-docker-compose)
    - [Running backend and frontend separately](#running-backend-and-frontend-separately)
      - [Backend](#backend)
      - [frontend](#frontend)
  - [Contributors](#contributors)

## Project description

General-purpose distribution platform developed for the McGill chapter of the Universities Allied for Essential Medicine.

## Setup

If you want to run the whole project using docker-compose, then you only need to set up the `.env` file in the top-level of the project.

If you want to run backend or frontend separately, you need to verify/configure `.env` file in each directory as well.

To configure the `.env` file use `.env.sample` as the template. All the keys in the sample files must be supplied for correct configuration.

NOTES: majority of these variables are build-time variables, do not confuse them with runtime variables

### Running docker compose

You can use docker-compose file for local development.

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

`+ Lucas Nelson, Edgar Chang, Tristan Stevens, Gaby Le Bideau, Zhekai Jiang`