# crlife-series
Crossroads Church discipleship series online application

The applicaiton leverages New Life Translation bible content (NLT) via Tyndale House Publishers online API service [NLT.TO API](http://api.nlt.to)

Daily devotional content is provided though Crossroads Church, Woodbury MN.  [crossroadschurch.cc](http://www.crossroadschurch.cc/)

The application is currently hosted at: https://crlife-series.azurewebsites.net/

## Application Components
The application consists of a **client** component (`/client`) and a **server** component (`/src/`)

**Server** : Express / Node.js

**Client** : React / Webpack

The code base uses **yarn** for package management and development tasks: https://yarnpkg.com



## Release
Releases are handled through the GitHub UI.  Click on 'releases' in the repository to create a new release.

Deployment of a release is handled via GitHub actions.  When a release is created, the `./.github/workflows/on-release.yml` action will take care of deployment to Microsoft Azure.

## Local Development

### Client Development
Install and build the client application first

```
./$ cd client
./client$ yarn install
./client$ yarn verify
```

At this point, the client can be developed on and tested independently (using pre-built content) using webpack dev server.

```
./client$ yarn dev
```

The client is then accessible at `http://localhost:8080`

### Server Development
Once the **client** has been built, install and build the server application, and then package the client

```
./$ yarn install
./$ yarn verify
./$ yarn packclient
```

The server can then be started in development mode
```
./$ yarn dev
```

The server is accessible at `http://localhost:3000` with series modules served (`/daily` and `/devo`)

