const { ApolloServer } = require('apollo-server');
const JokesAPI = require('./jokesAPI');
const RatingsAPI = require('./ratingsAPI');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    jokesAPI: new JokesAPI(),
    ratingsAPI: new RatingsAPI(),
  })
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
