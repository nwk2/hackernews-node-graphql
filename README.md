### Start commands
```
npm i
npm start
```
Go to localhost:4000 to access GraphQL playground
Example queries:
```
query {
  feed {
    id
    url
    description
  },
  link(id: "link-0") {
    id
    url
    description
  }
}

mutation {
  createLink(url: "www.prisma.io", description: "some description from mutation") {
  	id
    url
    description
  },
  deleteLink(id: "link-0") {
    id
  }
}
```


### TODO
- [x] bare graphql node server with nodemon
- [x] in-memory crud operations
- [ ] add database: https://www.howtographql.com/graphql-js/4-adding-a-database/
