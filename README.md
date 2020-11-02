# films-store-backend

It`s a back-end part of films-store-app. This project uses next technologies :

  - Express 4
  - TypeScript 4.0.5
  - Mongoose
  - Webpack

# Project File Structure
    src (source)
        components (divided by features, the folder contains logic of routes, services, validation)
        config 
            error (mechanism for error handling)
            middleware (extends basic express functionality)
        database (Model, schema, types for mongoDB)
        utils (Utility methods for working with file reading, logging)
    webpack (configs of a project for production/development mode)
    uploads (uploaded files)

# API endpoints:
API corresponds REST API
  - GET /api/films - get all films
  - GET /api/films/:id - get specific film by id
  - POST /api/films - add new film
  - DELETE /api/films/:id - remove film by id
  - POST /api/upload - import text file to DB
  
### General shape of Film object : 
    {
        id: string
        title: string,
        release_year: number,
        format: 'VHS' | 'DVD' | 'Blu-Ray',
        stars: string[],
    }

### Installation

Films-store-backend requires [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/) to run.
Tested with next versions: node[12.16.3], npm[6.14.8].

Install the dependencies and devDependencies and start the server.

```sh
$ cd films-store-backend
$ npm install
$ npm run start:dev
```

For production build:

```sh
$ npm run build
```


License
----
ISC

[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>