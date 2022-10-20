# BTC live React App
Frontend dockerized application using coincap.io API and React + Typescript, Redux state management, Formik in forms handling and MUI framework interface wise.
## `Local build`
### `1. npm install`
To install deps
### `2. npm run start`
Start local version\
Suggested port to open is http://localhost:3000
### `3. npm run build`
Prod build

## `Docker build`
### `docker build -t coincap:dev .`
First step - Run this command to build up the container

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