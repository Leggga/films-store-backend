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
  
POST /api/upload provides an easy way to import file. This route accepts only text files (text/plain).
Server read a `file` field of form-data. Conditions for successfully parsing of file:<br />

1. File must have at least one object<br />
2. All fields of the object except `id` is required <br />
3. Keys of the object not case-sensitive<br />
4. One pair key/value should take one line <br/>
5. After each object Must be one or more empty line<br/>
6. Space in the key will be replaced by an dash `_`

Example: `sample_movies.txt`

    Title: Raiders of the Lost Ark
    Release Year: 1981
    Format: DVD
    Stars: Harrison Ford, Karen Allen
    
    Title: ""
    ...
  
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