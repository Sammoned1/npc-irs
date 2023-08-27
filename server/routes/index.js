const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')


router.use('/user', userRouter)
router.use('/post', taskRouter)


module.exports = router