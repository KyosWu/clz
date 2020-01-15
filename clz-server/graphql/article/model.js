const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLID
} = require('graphql')

const GraphQLDate = require('graphql-date')

// 查询
let ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: {
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        original: {
            type: GraphQLString
        },
        des: {
            type: GraphQLString
        },
        list: {
            type: GraphQLString
        },
        banner: {
            type: GraphQLString
        },
        imgFileName: {
            type: GraphQLString
        }
    }
})

// 修改
let ArticleInput = new GraphQLInputObjectType({
    name: 'ArticleInput',
    fields: {
        title: {
            type: GraphQLString
        }
    }
})

module.exports = { ArticleType, ArticleInput }

