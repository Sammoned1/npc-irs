const Router = require('express')
const router = new Router()


router.get('/:id', postController.getPost)
router.get('/', postController.getAllPosts)
router.post('/', postController.createPost)


module.exports = router