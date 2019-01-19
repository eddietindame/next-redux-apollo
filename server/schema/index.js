const fs = require('fs')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')
const {
    users,
    message,
    add
} = require('../resolvers')

module.exports = {
    schema: makeExecutableSchema({
        typeDefs: fs.readFileSync(path.join(__dirname, '../../docs/api.graphql'), 'utf-8'),
        resolvers: {
            Query: {
                users,
                message,
                add
            }
        },
    })
}
