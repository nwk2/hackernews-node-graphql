const { ApolloServer } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')

const fs = require('fs')
const path = require('path')

// Dummy data for Links
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Some description'
}]
let idCount = links.length

// Implementation of schema
const resolvers = {
    Query: {
        info: () => `This is the API of hackernews clone`,
        feed: () => links,
        link: (_, args) => {
            let link = links.filter((link) => link.id === args.id)
            return link[0]
            // how to handle if link not found?
        }
    },
    // this is not needed, just for illustration of how links are resolved in 'feed' above
    // Link: {
    //     id: (parent) => parent.id,
    //     description: (parent) => parent.description,
    //     url: (parent) => parent.url
    // },
    Mutation: {
        createLink: (_, args) => {
            const link = {
                id: `link-${idCount++}`,
                url: args.url,
                description: args.description
            }
            links.push(link)
            return link
        },
        updateLink: (_, args) => {
            // filter to find item
            // if found => get index => replace
            // if not found => do nothing
            const filteredList = links.filter((link) => link.id === args.id)
            if (filteredList[0]) {
                let linkToUpdate = filteredList[0]
                if (args.url) {
                    linkToUpdate.url = args.url
                }
                if (args.description) {
                    linkToUpdate.description = args.url
                }
                return linkToUpdate
            }
        },
        deleteLink: (_, args) => {
            const linkToDelete = links.filter((link) => link.id === args.id)
            if (linkToDelete[0]) {
                links = links.filter((link) => link.id !== args.id)
            }
            return linkToDelete[0]
        }
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf-8'
    ),
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground
    ]
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );
