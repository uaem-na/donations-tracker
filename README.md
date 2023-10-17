# UAEM Donations Tracker Application for McGill UAEM chapter

- [UAEM Donations Tracker Application for McGill UAEM chapter](#uaem-donations-tracker-application-for-mcgill-uaem-chapter)
  - [Project description](#project-description)
    - [Running locally](#running-locally)
    - [DevTools](#devtools)
  - [Contributors](#contributors)

## Project description

General-purpose distribution platform developed for the McGill chapter of the Universities Allied for Essential Medicine.

### Running locally

Set up the `.env` file in the root directory based on `.env.sample` file. 

To run the application locally, you need to have docker and docker compose installed.

It is recommended to run Docker in rootless mode on supported platforms. If you are developing on Windows, you may want to use WSL2 to run Docker. Follow this [guide](https://docs.docker.com/desktop/windows/wsl/) to set up Docker in WSL2.

Also, you will need the following API keys from Google Cloud Platform:
* Google Maps API key
* Google Geocode API key
* Google Maps ID

Follow this [Google maps documentation](https://developers.google.com/maps/documentation/javascript/get-api-key) to get your API key.

Follow this [Google maps documentation](https://developers.google.com/maps/documentation/get-map-id) to get your map id.

After creating your map id you can create your map style use the following JSON. You can then assign the map style to the map id (it may take a few minutes before you see the map style change).
```json
[{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
```

Then run the following command to use docker compose for local development.

`docker compose build && docker compose up -d`

To build without cache:
`docker compose build --no-cache && docker compose up -d`

### DevTools

Feel free to use any IDE that you are comfortable with. However, we recommend using VSCode with the following extensions:
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [MongoDB for VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)
* [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

## Contributors 

[![](https://contrib.rocks/image?repo=uaem-na/donations-tracker)](https://github.com/uaem-na/donations-tracker/graphs/contributors)

`+ Lucas Nelson, Edgar Chang, Tristan Stevens, Gaby Le Bideau, Zhekai Jiang`