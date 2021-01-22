# Dad Joke "Dadabase"

Groan at some dad jokes and rate them as well. Which joke will be your favorite?

This app is built with [json-server](https://github.com/typicode/json-server).

## Running the app locally

1. `npm install`
2. `npm start`

## json-server routes

### Database

```
# See the current database contents
GET /db
```

### Jokes

```
GET    /jokes
GET    /jokes/1
POST   /jokes
PUT    /jokes/1
PATCH  /jokes/1
DELETE /jokes/1

# Get a specific joke with all ratings included
GET /jokes/1?_embed=ratings

# Get all ratings for a specific joke
GET /jokes/1/ratings
```

### Ratings

```
GET    /ratings
GET    /ratings/1
POST   /ratings
PUT    /ratings/1
PATCH  /ratings/1
DELETE /ratings/1

# Get all ratings for a specific joke
GET /ratings?jokeId=1

# Get a rating along with the joke itself
GET /ratings/1?_expand=joke
```
