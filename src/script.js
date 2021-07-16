// this file just demonstrates a basic usage of
// prisma client to interact with a db
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
    await prisma.link.create({
        data: {
            description: 'graphql prisma description',
            url: 'www.howtographql.com'
        }
    })
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
