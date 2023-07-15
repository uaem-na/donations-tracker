# UAEM Donations Tracker Application for McGill UAEM chapter

- [UAEM Donations Tracker Application for McGill UAEM chapter](#uaem-donations-tracker-application-for-mcgill-uaem-chapter)
  - [Project description](#project-description)
    - [Running locally](#running-locally)
  - [TODOs](#todos)
    - [Housekeeping](#housekeeping)
    - [Admin features](#admin-features)
    - [User features](#user-features)
  - [Contributors](#contributors)

## Project description

General-purpose distribution platform developed for the McGill chapter of the Universities Allied for Essential Medicine.

### Running locally

Set up the `.env` file in the root directory based on `.env.sample` file. As of writing, you only need to provide your own Google Maps API key for local development.

Then run the following command to use docker compose for local development.

`docker compose build && docker compose up -d`

To build without cache:
`docker compose build --no-cache && docker compose up -d`

## TODOs

### Housekeeping

- [ ] User emails must be verified
- [ ] Post must be in private mode where only the author and admins can read before it goes public
- [ ] When there is an activity on the post, authors must be notified
- [ ] Human friendly error messages
- [x] Seed users
- [x] Seed posts
- [ ] Seed reports

### Admin features

- [ ] *As an admin, I should be able to view a list of all users grouped by type (admin, organization, individual)*
- [ ] *As an admin, I should be able to verify/unverify an organization account*
- [ ] *As an admin, I should be able to enable/disable any account*
- [ ] As an admin, I should be able to check whether users have any associated reports

### User features

- [ ] As a user, I should be able to click a button to leave my contact info on a post
- [ ] As a user, I should be able to set a recovery email
- [ ] As an organization, I should be able to sign up using organization details
- [ ] As a user, I should be able to set a category for post (clothes, food, personal protective equipment, book, cutlery, stationary, furniture, toy, other - screend by admin)
- [ ] As a user, I should be able to set donate or sell on making a post for offer
- [ ] As a user, I should be able to set donate or purchase on making a post for request
- [ ] As a user, I should be able to view a list of public requests
- [ ] As a user, I should be able to view a list of public offers
- [ ] As a user, I should be able to track certain posts by adding them to account dashboard
- [ ] As a user, I should be able to view the posts on a map (landing page or "view")
- [ ] As a user, I should be able to use the app in both English and French


## Contributors 

[![](https://contrib.rocks/image?repo=uaem-na/donations-tracker)](https://github.com/uaem-na/donations-tracker/graphs/contributors)

`+ Lucas Nelson, Edgar Chang, Tristan Stevens, Gaby Le Bideau, Zhekai Jiang`