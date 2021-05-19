const express = require('express')
const {
  getCategories,
  createCategory,
  getCategory,
} = require('../controllers/category')

// include other resource routers
const documentRouter = require('./documents')

// include protect middleware
const {
  protect,
  authorize,
} = require('../middlewares/auth')

// express router
const router = express.Router()

// re-routes into other resource routers
router.use('/:categoryId/documents', documentRouter)

router
  .route('/')
  .get(
    protect,
    authorize('service1', 'admin'),
    getCategories
  )
  .post(
    protect,
    // authorize('service1', 'admin'),
    createCategory
  )

router
  .route('/:id')
  .get(
    protect,
    authorize('service1', 'admin'),
    getCategory
  )
//.delete(deleteCategory)

module.exports = router
