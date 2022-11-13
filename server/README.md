
## Description

Todo board application built on Nestjs


## Installation

```bash
$ npm install
```

## Setup the project

#### Create .env file at root directory

```dotenv
#Port for app
PORT
#Mongobd database username
DB_USER
#Mongobd database password
DB_PASSWORD
#Mongobd database name
DB_NAME

#Secret key for jwt token
SECRET_KEY

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```


## Documentation

### Server is running on http://localhost:8080

```bash
# swagger doc
http://localhost:8080/api/docs

# main routes 
http://localhost:8080/auth 
http://localhost:8080/users 
http://localhost:8080/boards 
http://localhost:8080/lists 
http://localhost:8080/tasks 

```


