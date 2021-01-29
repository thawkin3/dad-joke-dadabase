# Dad Joke "Dadabase"

Groan at some dad jokes and rate them as well. Which joke will be your favorite?

This app is built with [Apollo](https://www.apollographql.com/docs/).

## Running the app locally

1. `npm install`
2. `npm start`

This will start the GraphQL API on port 4000.

## REST API with json-server

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

# Get all jokes with all ratings included
GET /jokes?_embed=ratings
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

## GraphQL API with Apollo Server

### Jokes

#### Get all jokes

```graphql
query GetAllJokes {
  jokes {
    id
    content
  }
}
```

#### Get all jokes with ratings

```graphql
query GetAllJokesWithRatings {
  jokes {
    id
    content
    ratings {
      score
    }
  }
}
```

#### Get a specific joke

```graphql
query GetJoke {
  joke(id: 1) {
    id
    content
  }
}
```

#### Get a specific joke with ratings

```graphql
query GetJokeWithRatings {
  joke(id: 1) {
    id
    content
    ratings {
      score
    }
  }
}
```

### Ratings

#### Get all ratings

```graphql
query GetAllRatings {
  ratings {
    id
    jokeId
    score
  }
}
```

## Resources

- json-server: https://github.com/typicode/json-server
- Apollo GraphQL full-stack tutorial: - https://www.apollographql.com/docs/tutorial/introduction/
- Apollo GraphQL full-stack tutorial GitHub repo: https://github.com/apollographql/fullstack-tutorial
- Defining a GraphQL schema: https://www.apollographql.com/docs/apollo-server/schema/schema/
- Layering GraphQL on top of an existing REST API: https://www.apollographql.com/blog/layering-graphql-on-top-of-rest-569c915083ad/
- Apollo server data sources: https://www.apollographql.com/docs/apollo-server/data/data-sources/
