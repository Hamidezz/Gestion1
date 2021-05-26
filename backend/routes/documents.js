const express = require('express')
const {
  getDocuments,
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
} = require('../controllers/document')

// include protect middleware
const {
  protect,
  authorize,
} = require('../middlewares/auth')

const router = express.Router()

router
  .route('/')
  .get(
    protect,
    authorize('service1', 'service2', 'admin'),
    getDocuments
  )
  .post(
    protect,
    authorize('service1', 'admin'),
    createDocument
  )

router
  .route('/:id')
  .get(
    protect,
    authorize('service1', 'service2', 'admin'),
    getDocument
  )
  .put(
    protect,
    authorize('service1', 'admin'),
    updateDocument
  )
  .delete(
    protect,
    authorize('service1', 'admin'),
    deleteDocument
  )

module.exports = router
