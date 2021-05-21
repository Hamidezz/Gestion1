const Category = require('../models/Category')
const Collection = require('../models/Collection')
const History = require('../models/History')
const ErrorResponse = require('../utils/ErrorResponse')

// @desc    Get collections
// @route   GET /api/collections
// @access  private
exports.getCollections = async (req, res, next) => {
  const collections = await Collection.find().populate(
    'documents.doc',
    'firstName cin'
  )
  res.json({ success: true, data: collections })
}

// @desc    Get single collection
// @route   GET /api/collections/:id
// @access  private
exports.getCollection = async (req, res, next) => {
  const collection = await Collection.findById(
    req.params.id
  ).populate('documents.doc', 'firstName cin')

  if (!collection) {
    return next(
      new ErrorResponse(
        `category not found with id ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({
    success: true,
    data: collection,
  })
}

// @desc    create collection
// @route   GET /api/collections
// @access  private
exports.createCollection = async (req, res, next) => {
  const { documents } = req.body
  let minlength = 1

  // check if ther is at least 50 docs
  if (documents.length < minlength) {
    return next(
      new ErrorResponse(
        `please selct mor than ${minlength} docs, ${documents.length} slected`,
        400
      )
    )
  }

  const collection = await Collection.create(req.body)

  // create new history
  await History.create({
    text: `${req.user.name} created new collection , ${documents.length} documents`,
    collectionId: collection,
    sent: true,
  })

  res.status(200).json({
    success: true,
    data: collection,
  })
}

// @desc    update collection
// @route   put /api/collections/:id
// @access  private
exports.updateCollection = async (req, res, next) => {
  let collection = Collection.findById(req.params.id)

  // chek if doc exist
  if (!collection) {
    return next(
      new ErrorResponse(
        `collection not found with id ${req.params.id}`,
        400
      )
    )
  }

  // update doc
  collection = await Collection.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )
  res.status(200).json({
    success: true,
    data: collection,
  })
}

// @desc    delete collection
// @route   delete /api/collections/:id
// @access  private
exports.deleteCollection = async (req, res, next) => {
  const collection = Collection.findById(req.params.id)

  // chek if doc exist
  if (!collection) {
    return next(
      new ErrorResponse(
        `collection not found with id ${req.params.id}`,
        400
      )
    )
  }

  // delete doc
  await Collection.findByIdAndRemove(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
}

// @desc    add collection to category
// @route   put /api/collections/:collectionId/Categories/:categoryId
// @access  private
exports.addCollectionToCat = async (
  req,
  res,
  next
) => {
  let category = await Category.findById(
    req.params.categoryId
  )
  // check for cat
  if (!category) {
    return next(
      new ErrorResponse(`category not found`, 404)
    )
  }

  let collection = await Collection.findById(
    req.params.collectionId
  )

  // check for collection
  if (!collection) {
    return next(
      new ErrorResponse(`collection not found`, 404)
    )
  }

  // update collection to sorted
  collection = await Collection.findByIdAndUpdate(
    req.params.collectionId,
    { status: 'sorted' },
    { new: true, runValidators: true }
  )

  // add collection to category
  category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      collectionId: collection._id,
    },
    { new: true, runValidators: true }
  )

  // update hisstory
  await History.findOneAndUpdate(
    { collectionId: collection._id },
    {
      sorted: true,
    },
    { new: true, runValidators: true }
  )

  res.status(200).json({
    success: true,
    data: category,
  })
}
