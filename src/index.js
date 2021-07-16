const { ApolloServer } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const { PrismaClient } = require('@prisma/client')

const fs = require('fs')
const path = require('path')

// Implementation of schema
const resolvers = {
    Query: {
        info: () => `This is the API of hackernews clone`,
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany()
        },
        link: async (parent, args, context) => {
            return context.prisma.link.findUnique({
                where: {
                    id: parseInt(args.id)
                }
            })
       }
    },
    // this is not needed, just for illustration of how links are resolved in 'feed' above
    // Link: {
    //     id: (parent) => parent.id,
    //     description: (parent) => parent.description,
    //     url: (parent) => parent.url
    // },
    Mutation: {
        createLink: (_, args, context) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description
                }
            })
            return newLink
       },
        updateLink: (_, args, context) => {
            const updateLink = context.prisma.link.update({
                where: {
                    id: parseInt(args.id)
                },
                data: {
                    url: args.url,
                    description: args.description
                }
            })
            return updateLink
        },
        deleteLink: (_, args, context) => {
            const deleteLink = context.prisma.link.delete({
                where: {
                    id: parseInt(args.id)
                }
            })
            return deleteLink
        }
    }
}

const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf-8'
    ),
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground
    ],
    context: { prisma }
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );
