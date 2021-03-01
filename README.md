# Expendity React

Frontend for [Expendity](https://github.com/prixladi/expendity) project.<br />
For everything to function properly should be run together with [Backend](https://github.com/prixladi/expendity-server).

## Yarn

When using **Yarn** keep in mind that you need to run additional services for the app to function properly. You can use docker as described below. If you decide to use another method you will probably need to change the default configuration.

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see some lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

## Docker

### `docker build .`

Builds a production-ready image.

### `docker-compose up`

Runs app container and other containers (**PostgreSQL, Authorization Service, Expendity Server, etc...**) and builds app image if does not exist.
