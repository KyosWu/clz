const {
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql')

const {
    ArticleInput
} = require('./model')
const mongoose = require('mongoose')
const uuid = require('uuid')

const ArticleModel = require('./model-sequelize')

const ArticleCreate = {
    type: GraphQLBoolean,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(ArticleInput)
        }
    },
    async resolve (root, params, options) {
        params.auth_token = uuid.v4()

        const ArticleModel = new ArticleModel(params.data)
        const Article = await ArticleModel.save()

        if (!Article) {
            throw new Error('Error create new article')
        }
        return true
    }
}

module.exports = {
    ArticleCreate
}
