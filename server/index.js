require('dotenv').config()
const express = require('express')
const next = require('next')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const { isAuth } = require('./middleware/isAuth')
const { schema } = require('./schema')

const {
    MONGO_DB,
    MONGO_PASSWORD,
    MONGO_USER,
    NODE_ENV,
    PORT
} = process.env
const port = parseInt(PORT, 10) || 3000
const dev = NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

if (!dev) console.log = function() {}

app.prepare()
    .then(() => {
        const server = express()
        const apolloServer = new ApolloServer({ schema })

        server.use(isAuth)

        apolloServer.applyMiddleware({ app: server })

        server.get('*', (req, res) => handle(req, res))

        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-fzaky.mongodb.net/${MONGO_DB}?retryWrites=true`)
            .then(() => {
                server.listen(port, err => {
                    if (err) throw err
                    console.log(`> Ready on http://localhost:${port}`)
                })
            })
            .catch(error => { throw error })
    })
