const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: () => 'world'
    }
}

module.exports = {
    typeDefs,
    resolvers
}
