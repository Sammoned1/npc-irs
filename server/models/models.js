const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    username: { type: DataTypes.TEXT, allowNull:false, unique: true},
    password: { type: DataTypes.TEXT, allowNull:false},
    taskAmount: {type: DataTypes.INTEGER, allowNull:false}
})

const Task = sequelize.define('task', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    task: { type: DataTypes.TEXT, allowNull:false},
    description: { type: DataTypes.TEXT, allowNull:true},
    status : {type: DataTypes.TEXT, allowNull:false},
    progress: {type:DataTypes.INTEGER, allowNull: false}
})

User.hasMany(Task)
Task.belongsTo(User)

module.exports = {
    User,
    Task
}