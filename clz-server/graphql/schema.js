const {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql')

const ArticleQueries = require ('./article/query')
const ArticleMutations = require('./article/mutation')

module.exports =  new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Queries',
        fields: Object.assign(
            ArticleQueries
        )
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutations',
        fields: Object.assign(
            ArticleMutations
        )
    })
})
