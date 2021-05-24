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
        `collection not found with id ${req.params.id}`,
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
    sentAt: Date.now(),
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
  const collection = await Collection.findById(
    req.params.id
  )

  // chek if doc exist
  if (!collection) {
    return next(
      new ErrorResponse(
        `collection not found with id ${req.params.id}`,
        400
      )
    )
  }

  // delete collection
  collection.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
}

// @desc    add collection to category
// @route   put /api/collections/add/:collectionId/Categories/:categoryId
// @access  private
exports.addCollectionToCat = async (
  req,
  res,
  next
) => {
  updateCatCollectios(
    req.params.categoryId,
    req.params.collectionId,
    'push',
    res,
    next
  )
}

// @desc    remove collection from category
// @route   put /api/collections/remove/:collectionId/Categories/:categoryId
// @access  private
exports.removeCollectionFromCat = async (
  req,
  res,
  next
) => {
  updateCatCollectios(
    req.params.categoryId,
    req.params.collectionId,
    'pull',
    res,
    next
  )
}

// update collections in category
const updateCatCollectios = async (
  catId,
  colId,
  action,
  res,
  next
) => {
  let category = await Category.findById(catId)
  // check for cat
  if (!category) {
    return next(
      new ErrorResponse(`category not found`, 404)
    )
  }

  let collection = await Collection.findById(colId)

  // check for collection
  if (!collection) {
    return next(
      new ErrorResponse(`collection not found`, 404)
    )
  }

  // check if remove or add collection

  if (action === 'push') {
    // add collection to category
    category = await Category.findByIdAndUpdate(
      catId,
      {
        $push: {
          collections: collection,
        },
      }
    )

    // update collection to sorted
    collection = await Collection.findByIdAndUpdate(
      colId,
      { status: 'sorted' },
      { new: true, runValidators: true }
    )

    // update hisstory
    await History.findOneAndUpdate(
      { collectionId: collection._id },
      {
        sorted: true,
        sortedAt: Date.now(),
      },
      { new: true, runValidators: true }
    )
  }

  if (action === 'pull') {
    // remove collection from category
    category = await Category.findByIdAndUpdate(
      catId,
      {
        $pull: {
          collections: collection._id,
        },
      }
    )

    // update hisstory
    await History.findOneAndUpdate(
      { collectionId: collection._id },
      {
        sorted: false,
        sortedAt: undefined,
      },
      { new: true, runValidators: true }
    )
  }

  res.status(200).json({
    success: true,
    data: category,
  })
}
