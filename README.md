# BTC live React App
Frontend test for BITA GmbH. 

## Project STACK information

Dockerized application fetching Coincap.io API data

React + Typescript, Redux state management

Formik for forms

MUI framework for styles

## `Local build`
### `1. npm install`

### `2. npm run start`
App will be running in http://localhost:3000

### `3. npm run build`
Prod build

### `4. Enter credentials`
#### Email: user@example.com
#### Password: user@example.com

## `Docker build`
### `docker build -t coincap:dev .`
1 - Execute this command to build up the container

    docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    coincap:dev

Second step - Run this command to spin up a container\
Suggested port to open is http://localhost:3001