const express = require('express')
const {ApolloServer, gql} = require('apollo-server-express')

const port = process.env.PORT || 4000

let notes = [
    {
        id: '1',
        content: 'This is a note',
        author: 'Adam Scott'
    },
    {
        id: '2',
        content: 'This is Sparta',
        author: 'Simple Spartanian'
    },
    {
        id: '3',
        content: 'Oh hey look, another note!',
        author: 'Riley Harrison'
    }
]

const typeDefs = gql`
    
type Query {
        hello: String
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Note {
        id: ID!
        content: String!
        author: String!
    }
    
`
const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        notes: () => notes,
        note: (parent, args) =>  {
            return notes.find(note => note.id === args.id)
        }
    }
}




async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers })
    const app = express()
    await server.start()
    server.applyMiddleware({ app, path: '/api' })
    
    app.listen({ port, server }, () => {
        console.log(
            `GraphQL Server running at 'http://localhost:${port}${server.graphqlPath}'!`
            )
    })
}

startApolloServer(typeDefs, resolvers)


