const express = require('express')
const {
  getCollection,
  getCollections,
  deleteCollection,
  createCollection,
  updateCollection,
  addCollectionToCat,
  removeCollectionFromCat,
} = require('../controllers/collection')

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
    authorize('service1', 'service2', 'admin'),
    getCollections
  )
  .post(
    protect,
    authorize('service1', 'admin'),
    createCollection
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
    getCollection
  )
  .put(
    protect,
    authorize('service1', 'admin'),
    updateCollection
  )
  .delete(
    protect,
    authorize('service1', 'admin'),
    deleteCollection
  )

router
  .route('/add/:collectionId/Categories/:categoryId')
  .put(
    protect,
    authorize('service2', 'admin'),
    addCollectionToCat
  )

router
  .route(
    '/remove/:collectionId/Categories/:categoryId'
  )
  .put(
    protect,
    authorize('service2', 'admin'),
    removeCollectionFromCat
  )

module.exports = router
