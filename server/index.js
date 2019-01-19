require('dotenv').config()
const express = require('express')
const next = require('next')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

if (!dev) console.log = function() {}

app.prepare()
    .then(() => {
        const server = express()
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers
        })

        apolloServer.applyMiddleware({ app: server })

        server.get('*', (req, res) => handle(req, res))

        server.listen({ port }, err => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
