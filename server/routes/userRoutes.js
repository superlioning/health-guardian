const { RootQueryType, RootMutationType } = require('../controllers/userController')
const { GraphQLSchema } = require('graphql')


/**
 * Import RootQueryType and RootMutationType from controller file 
 * Create a GraphQL schema based on root queries and mutations  
 */


// GraphQL schema
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

// Export schema
module.exports = schema;