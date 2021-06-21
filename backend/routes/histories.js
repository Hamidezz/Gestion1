const express = require('express')
const {
  getHistories,
} = require('../controllers/history')

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
    getHistories
  )

module.exports = router
