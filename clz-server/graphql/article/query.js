const { GraphQLID, GraphQLList, GraphQLNonNull,GraphQLString } = require('graphql')

const { ArticleType } = require('./model')

const request = require('request-promise')
const BASE_URL = 'http://localhost:4444'

const ArticleModel = require('./model-sequelize')

function fetchResponseByURL (relativeURL) {
    return request({
        url: `${BASE_URL}${relativeURL}`,
        json: true
    })
}
function fetchArticle () {
    return fetchResponseByURL('/api/article')
}
function fetchArticleByURL (relativeURL) {
    return fetchResponseByURL(relativeURL)
}

const Article = {
    type: ArticleType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params, options) {
        return fetchArticleByURL(`/graphql/article/${params.id}`)
    }
}

const Articles = {
    type: ArticleType,
    args: {},
    async resolve(root, params, option) {
        return fetchArticle()
    }
}

module.exports = {
    Article,
    Articles
}
