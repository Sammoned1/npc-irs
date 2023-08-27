const {User} = require('../models/models')
const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt')

class UserController{
    async createUser(req,res, next){
        const {username, password} = req.body
        if (!username || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {username}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, password: hashPassword, taskAmount: 0})
        return res.json({user})
    }
    
    async getUser(req,res,next){
        const { id } = req.params;
        // return res.json(req.params)
        if (!id) {
            return next(ApiError.badRequest('Некорректный userId'))
        }
        const user = await User.findOne({where: {id}})
        if (!user)
            return next(ApiError.badRequest('Пользователь с таким id не найден'))
        return res.json({user})
    }

    async getAllUsers(req,res,next){
        const {limit, offset} = req.query
        const users = await User.findAll({limit, offset})
        return res.json(users)
    }
}

module.exports = new UserController()