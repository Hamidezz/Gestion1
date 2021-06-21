const Order = require('../models/Order')
const Document = require('../models/Document')
const Collection = require('../models/Collection')
const History = require('../models/History')
const ErrorResponse = require('../utils/ErrorResponse')

// @desc    create order
// @route   POST /api/orders
// @access  private
exports.createOrder = async (req, res, next) => {
  const { coll, recipient } = req.body
  if (coll.documents && coll.documents.length === 0) {
    return next(
      new ErrorResponse(
        `n'a pas réussi à créer une commande avec 0 documents`,
        404
      )
    )
  } else {
    let order = await Order.create({
      documents: coll.documents,
    })
    await Collection.findByIdAndUpdate(coll._id, {
      $set: {
        status: 'placed',
        placedAt: Date.now(),
        recipient,
      },
    })

    const docs = coll.documents.map((doc) => doc.doc)

    await Document.updateMany(
      { _id: { $in: docs } },
      {
        $set: { status: 'placed' },
      },
      { multi: true }
    )

    // create new history
    await History.create({
      order,
    })

    res.status(200).json({
      success: true,
      message: 'nouveau ordre créé avec succès',
      data: order,
    })
  }
}

// @desc    get single order
// @route   POST /api/orders/:id
// @access  private
exports.getOrder = async (req, res, next) => {
  const order = await Order.findById(
    req.params.id
  ).populate('documents.doc')

  if (order) {
    res.status(200).json({
      success: true,
      data: order,
    })
  } else {
    return next(
      new ErrorResponse('Order Not found', 404)
    )
  }
}

// @desc    get all orders
// @route   POST /api/orders
// @access  private
exports.getOrders = async (req, res, next) => {
  let orders

  try {
    orders = await Order.find({}).populate(
      'documents.doc'
    )
  } catch (err) {
    return next(
      new ErrorResponse(
        `quelque chose s'est mal passé, veuillez actualiser la page`,
        400
      )
    )
  }

  res.status(200).json({
    success: true,
    data: orders,
  })
}
