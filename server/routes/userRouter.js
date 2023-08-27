const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')


router.get('/:id', userController.getUser)
router.get('/', userController.getAllUsers)
router.post('/', userController.createUser)


module.exports = router