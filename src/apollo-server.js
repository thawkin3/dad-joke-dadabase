const express = require('express')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const JokesAPI = require('./jokesAPI')
const RatingsAPI = require('./ratingsAPI')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    jokesAPI: new JokesAPI(),
    ratingsAPI: new RatingsAPI(),
  }),
})

server.applyMiddleware({ app })

app
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' })
  })
  .get('/script.js', (req, res) => {
    res.sendFile('script.js', { root: 'public' })
  })
  .get('/style.css', (req, res) => {
    res.sendFile('style.css', { root: 'public' })
  })

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at port ${process.env.PORT || 4000}`)
})
