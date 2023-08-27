const Router = require('express')
const router = new Router()
const postController = require('../controllers/taskController')


router.get('/:id', postController.getTask)
router.get('/', postController.getAllTasks)
router.post('/', postController.createTask)


module.exports = router