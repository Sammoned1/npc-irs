const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')


router.get('/:id', taskController.getTask)
router.get('/', taskController.getAllTasks)
router.post('/', taskController.createTask)
router.post('/delete/', taskController.deleteTask)
router.put('/', taskController.updateTask)

module.exports = router