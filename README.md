# UAEM Donations Tracker Application for McGill UAEM chapter

- [UAEM Donations Tracker Application for McGill UAEM chapter](#uaem-donations-tracker-application-for-mcgill-uaem-chapter)
  - [Project description](#project-description)
    - [Running locally](#running-locally)
  - [TODOs](#todos)
    - [Housekeeping](#housekeeping)
    - [Admin features](#admin-features)
    - [Features](#features)
    - [Out of scope](#out-of-scope)
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

- [ ] Bilingual support (English and French)
- [ ] Human friendly error messages
- [ ] Fix error mapping in API (not returning arrays anymore in validation)
- [ ] E-mail addresses must be verified

### Admin features

- [x] Users table
- [x] Activate/deactivate accounts
- [x] Verify organization accounts
- [x] Approve posts when "other" category is selected
- [ ] Review post reports

### Features

- [x] Public post listings
- [x] Post creation
- [x] Post editing
- [x] Post deletion
- [x] Landing page map with posts
- [x] Star possts and track them in dashboard
- [x] View own posts in dashboard
- [ ] Report posts

### Out of scope

- [ ] When there is an activity on the post, authors must be notified
- [ ] Post image support

## Contributors 

[![](https://contrib.rocks/image?repo=uaem-na/donations-tracker)](https://github.com/uaem-na/donations-tracker/graphs/contributors)

`+ Lucas Nelson, Edgar Chang, Tristan Stevens, Gaby Le Bideau, Zhekai Jiang`