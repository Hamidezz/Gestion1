const express = require('express')
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  placeCategory,
} = require('../controllers/category')

// include protect middleware
const {
  protect,
  authorize,
} = require('../middlewares/auth')

// express router
const router = express.Router()

router
  .route('/')
  .get(
    protect,
    authorize(
      'service1',
      'service2',
      'service3',
      'admin'
    ),
    getCategories
  )
  .post(
    protect,
    authorize('service2', 'service1', 'admin'),
    createCategory
  )

router
  .route('/:id')
  .get(
    protect,
    authorize(
      'service1',
      'service2',
      'service3',
      'admin'
    ),
    getCategory
  )
  .put(
    protect,
    authorize('service2', 'admin'),
    updateCategory
  )
  .delete(
    protect,
    authorize('service2', 'admin'),
    deleteCategory
  )

router
  .route('/:categoryId/collections/:collectionId')
  .put(
    protect,
    authorize('service3', 'admin'),
    placeCategory
  )

module.exports = router
