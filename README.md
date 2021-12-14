### Project ORM

[![coverage report](https://raw.githubusercontent.com/jhonmart/Sequelize/main/badges/badge-lines.svg?token=AMPN57BI2TS523WGX6ZNZSDBXED6I)](https://github.com/jhonmart/Sequelize/)

## Basic Commands

### Docker Commands

#### Build the containers

```sh
docker-compose build
```

#### Run all containers

```sh
docker-compose up -d
```
### Non-Docker Commands

#### Create your database and set DATABASE_URL

```sh
SET DATABASE_URL='sqlite::memory'
```
[Connecting to a database](https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database)


#### Install dependencies

```sh
yarn install
```

#### Run the Server

```sh
yarn start
```