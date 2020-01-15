const {sequelize} = require('../../config/sequelize-mysql');
const {Sequelize, Model} = require('sequelize');

const articleFields = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    original: Sequelize.STRING,
    des: Sequelize.STRING,
    list: Sequelize.STRING,
    banner: Sequelize.STRING,
    imgFileName: Sequelize.STRING,
}

class Article extends Model {

}

Article.init(articleFields, {
    sequelize,
    tableName: 'Article'
})

module.exports = {
    Article
}
