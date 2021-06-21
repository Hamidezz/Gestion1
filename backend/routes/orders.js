const express = require('express')
const {
  getOrders,
  createOrder,
  getOrder,
} = require('../controllers/order')

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
    getOrders
  )
  .post(
    protect,
    authorize('service1', 'admin'),
    createOrder
  )

router
  .route('/:id')
  .get(
    protect,
    authorize('service1', 'service2', 'admin'),
    getOrder
  )

module.exports = router
