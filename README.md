# UAEM Donations Tracker Application for McGill UAEM chapter

- [UAEM Donations Tracker Application for McGill UAEM chapter](#uaem-donations-tracker-application-for-mcgill-uaem-chapter)
  - [Project description](#project-description)
    - [Running locally](#running-locally)
  - [Contributors](#contributors)

## Project description

General-purpose distribution platform developed for the McGill chapter of the Universities Allied for Essential Medicine.

### Running locally

Set up the `.env` file in the root directory based on `.env.sample` file. As of writing, you only need to provide your own Google Maps API key for local development.

Then run the following command to use docker compose for local development.

`docker compose build && docker compose up -d`

To build without cache:
`docker compose build --no-cache && docker compose up -d`

## Contributors 

[![](https://contrib.rocks/image?repo=uaem-na/donations-tracker)](https://github.com/uaem-na/donations-tracker/graphs/contributors)

`+ Lucas Nelson, Edgar Chang, Tristan Stevens, Gaby Le Bideau, Zhekai Jiang`