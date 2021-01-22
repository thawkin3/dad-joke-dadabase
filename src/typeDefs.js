const { gql } = require('apollo-server');

const typeDefs = gql`
  type Joke {
    id: Int!
    content: String!
    ratings: [Rating]
  }

  type Rating {
    id: Int!
    jokeId: Int!
    score: Int!
  }

  type Query {
    joke(id: Int!): Joke
    jokes: [Joke]
    rating(id: Int!): Rating
    ratings: [Rating]
  }
`;

module.exports = typeDefs;
