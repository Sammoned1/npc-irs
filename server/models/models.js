const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    text: { type: DataTypes.TEXT, allowNull:false}
})

const Task = sequelize.define('task', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    text: { type: DataTypes.TEXT, allowNull:false}
})

User.hasMany(Task)
Task.belongsTo(User)

module.exports = {
    User,
    Task
}