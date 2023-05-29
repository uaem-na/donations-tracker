# UAEM Donations Tracker Application for McGill UAEM chapter

- [UAEM Donations Tracker Application for McGill UAEM chapter](#uaem-donations-tracker-application-for-mcgill-uaem-chapter)
  - [Project description](#project-description)
  - [Setup](#setup)
    - [Developing locally](#developing-locally)
  - [Contributors](#contributors)

## Project description

General-purpose distribution platform developed for the McGill chapter of the Universities Allied for Essential Medicine.

## Setup

If you want to run the whole project using docker-compose, then you only need to set up the `.env` file in the top-level of the project.

If you want to run backend or frontend separately, you need to verify/configure `.env` file in each directory as well.

To configure the `.env` file use `.env.sample` as the template. All the keys in the sample files must be supplied for correct configuration.

NOTES: majority of these variables are build-time variables, do not confuse them with runtime variables

### Developing locally

Set up the `.env` file in the root directory based on `.env.sample` file. As of writing, you only need to provide your own Google Maps API key for local development.

Then run the following command to use docker compose for local development.

`docker-compose build && docker-compose up -d`

NOTE: If you use Windows as host for your docker containers, initializing react development server can take quite some time. Check the container logs for its progress.

## Contributors 

[![](https://contrib.rocks/image?repo=uaem-na/donations-tracker)](https://github.com/uaem-na/donations-tracker/graphs/contributors)

`+ Lucas Nelson, Edgar Chang, Tristan Stevens, Gaby Le Bideau, Zhekai Jiang`