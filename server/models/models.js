const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    text: { type: DataTypes.TEXT, allowNull:false}
})

const Post = sequelize.define('post', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    text: { type: DataTypes.TEXT, allowNull:false}
})

User.hasMany(Post)
Post.belongsTo(User)

module.exports = {
    User,
    Post
}