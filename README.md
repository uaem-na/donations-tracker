# UAEM Donations Tracker Application for McGill UAEM chapter

- [UAEM Donations Tracker Application for McGill UAEM chapter](#uaem-donations-tracker-application-for-mcgill-uaem-chapter)
  - [Project description](#project-description)
    - [Running locally](#running-locally)
  - [TODOs](#todos)
    - [Housekeeping](#housekeeping)
    - [Admin features](#admin-features)
    - [User features](#user-features)
    - [Organization features](#organization-features)
  - [Contributors](#contributors)

## Project description

General-purpose distribution platform developed for the McGill chapter of the Universities Allied for Essential Medicine.

### Running locally

Set up the `.env` file in the root directory based on `.env.sample` file. As of writing, you only need to provide your own Google Maps API key and Google Map ID for local development.

Follow this [Google maps documentation](https://developers.google.com/maps/documentation/get-map-id) to get your map id.

After creating your map id you can create your map style use the following JSON. You can then assign the map style to the map id (it may take a few minutes before you see the map style change).
```json
[{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
```

Then run the following command to use docker compose for local development.

`docker compose build && docker compose up -d`

To build without cache:
`docker compose build --no-cache && docker compose up -d`

## TODOs

### Housekeeping

- [x] Seed users
- [x] Seed posts
- [x] Seed reports
- [ ] Human friendly error messages
- [ ] Post must be in private mode where only the author and admins can read before it goes public
- [ ] User emails must be verified (depends on email service provider such as Amazon SES)
- [ ] When there is an activity on the post, authors must be notified

### Admin features

- [x] As an admin, I should be able to view a list of all users grouped by type (admin, organization, individual)
- [x] As an admin, I should be able to activate/deactivate any account
- [ ] As an admin, I should be able to verify/unverify an organization account
- [ ] As an admin, I should be able to check whether users have any associated reports
- [ ] Add pagination, sorting, and filtering to admin/users page

### User features

- [X] As a user, I should be able to view a list of public requests
- [X] As a user, I should be able to view a list of public offers
- [x] As a user, I should be able to set a category for post (clothes, food, personal protective equipment, book, cutlery, stationary, furniture, toy, other - screend by admin)
- [ ] As a user, I should be able to create a request, edit and delete my own requests
- [ ] As a user, I should be able to view my own requests/offers in my account dashboard
- [ ] As a user, I should be able to track others' requests/offers in my account dashboard
- [ ] As a user, I should be able to click a button to leave my contact info on a post
- [ ] As a user, I should be able to view the posts on a map (landing page or "view")
- [ ] As a user, I should be able to use the app in both English and French
- [ ] Add pagination, sorting, and filtering to public requests/offers page

### Organization features

- [ ] As an organization, I should be able to sign up using organization details
- [ ] As an organization, I should be able to create a request/offer

## Contributors 

[![](https://contrib.rocks/image?repo=uaem-na/donations-tracker)](https://github.com/uaem-na/donations-tracker/graphs/contributors)

`+ Lucas Nelson, Edgar Chang, Tristan Stevens, Gaby Le Bideau, Zhekai Jiang`