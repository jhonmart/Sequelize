### Project ORM

<a href="https://github.com/jhonmart/Sequelize/commits">
  <img align="left" src="https://raw.githubusercontent.com/jhonmart/Sequelize/main/badges/badge-functions.svg">
  <img align="left" src="https://raw.githubusercontent.com/jhonmart/Sequelize/main/badges/badge-lines.svg">
  <img align="left" src="https://raw.githubusercontent.com/jhonmart/Sequelize/main/badges/badge-branches.svg">
</a>
<br>


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

#### Migrate container

```sh
docker-compose exec web yarn migrate
```

#### Load initialdata

```sh
docker-compose exec web yarn seed
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

#### Migrate container

```sh
yarn migrate
```

#### Load initialdata

```sh
yarn seed
```