# example-currency-asset-manager

## Description

Example backend: manager for crypto assets with auth

## Running the app

For running example with postgresql:

```bash
docker-compose up --build
```

You will also need a `.env` file with the following contents in the base folder:

```
PORT=3000
BASE_URL=http://localhost:3000

DATABASE_HOST=localhost
DATABASE_NAME=nest_api
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_PORT=5432
```

Alternatively, for just the backend service without database:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger docs url

`http://localhost:8080/api`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
