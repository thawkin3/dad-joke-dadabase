const { ApolloServer, gql } = require('apollo-server');
const JokesAPI = require('./jokesAPI');
const RatingsAPI = require('./ratingsAPI');

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

const resolvers = {
  Query: {
    joke: async (_source, { id }, { dataSources }) => dataSources.jokesAPI.getJoke(id),
    jokes: async (_source, _args, { dataSources }) => dataSources.jokesAPI.getJokes(),
    rating: async (_source, { id }, { dataSources }) => dataSources.ratingsAPI.getRating(id),
    ratings: async (_source, _args, { dataSources }) => dataSources.ratingsAPI.getRatings(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    jokesAPI: new JokesAPI(),
    ratingsAPI: new RatingsAPI(),
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
