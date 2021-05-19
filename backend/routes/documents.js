const express = require('express')
const {
  getDocuments,
  createDocument,
} = require('../controllers/document')

// include protect middleware
const {
  protect,
  authorize,
} = require('../middlewares/auth')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    protect,
    authorize('service1', 'service2', 'admin'),
    getDocuments
  )
  .post(
    protect,
    authorize('service1', 'service2', 'admin'),
    createDocument
  )

module.exports = router
