const Category = require('../models/Category')
const Document = require('../models/Document')
const Collection = require('../models/Collection')
const ErrorResponse = require('../utils/ErrorResponse')
const { notify } = require('../utils/notify')

// @desc    Get collections
// @route   GET /api/collections
// @access  private
exports.getCollections = async (req, res, next) => {
  const collections = await Collection.find().populate(
    'documents.doc'
  )
  res.json({ success: true, data: collections })
}

// @desc    Get single collection
// @route   GET /api/collections/:id
// @access  private
exports.getCollection = async (req, res, next) => {
  const collection = await Collection.findById(
    req.params.id
  ).populate('documents.doc')

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
// @route   POST /api/collections
// @access  private
exports.createCollection = async (req, res, next) => {
  const { documents } = req.body
  let minlength = 50

  // check if ther is at least 50 docs
  if (documents.length < minlength) {
    return next(
      new ErrorResponse(
        `please selct mor than ${minlength} docs, ${documents.length} slected`,
        400
      )
    )
  }
  if (!req.body.title) {
    req.body.title = Math.floor(Math.random() * 999999)
  }

  const collection = await Collection.create(req.body)

  // notify user N2
  notify(req, documents.length, collection._id)

  res.status(200).json({
    success: true,
    message: 'collection envoyée avec succès',
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
    message: 'collection modifiée avec succès',
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
    message: 'collection supprimée avec succès',
    data: {},
  })
}

// @desc    add category to collection
// @route   put /api/collections/add/:collectionId/Categories/:categoryId
// @access  private
exports.addCateToColl = async (req, res, next) => {
  const { authority, followed } = req.body
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
  ).populate('documents.doc')

  // check for collection
  if (!collection) {
    return next(
      new ErrorResponse(`collection not found`, 404)
    )
  }

  //
  if (authority === '' || followed === '') {
    return next(
      new ErrorResponse(
        `veuillez remplir toutes les entrées`,
        404
      )
    )
  }

  // update collection to sorted
  await Collection.findByIdAndUpdate(collection._id, {
    $set: { status: 'sorted', authority, followed },
  })

  // update docs
  const docs = collection.documents.map(
    (doc) => doc.doc
  )

  await Document.updateMany(
    { _id: { $in: docs } },
    {
      $set: { status: 'sorted', category: category },
    },
    { multi: true }
  )

  res.status(200).json({
    success: true,
    message: 'collection envoyée avec succès',
    data: collection,
  })
}
