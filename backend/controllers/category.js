const Category = require('../models/Category')
const Collection = require('../models/Collection')
const History = require('../models/History')
const ErrorResponse = require('../utils/ErrorResponse')

// @desc    Get Categories
// @route   GET /api/Categories
// @access  private
exports.getCategories = async (req, res, next) => {
  const Categories = await Category.find().populate(
    'collectionId',
    'documents'
  )
  res.json({
    success: true,
    data: Categories,
  })
}

// @desc    create Category
// @route   POST /api/Categories
// @access  private
exports.createCategory = async (req, res, next) => {
  const existCategory = await Category.findOne({
    name: req.body.name,
  })

  if (existCategory) {
    return next(
      new ErrorResponse(
        `category with ${req.body.name} already taken , please try another name`,
        400
      )
    )
  }

  let category

  try {
    category = await Category.create(req.body)
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(
        new ErrorResponse(
          'le nom de la catégorie est requis',
          400
        )
      )
    }
  }

  // create new history
  await History.create({
    category,
  })

  res.status(200).json({
    success: true,
    message: 'nouveau catégorie créé avec succès',
    data: category,
  })
}

// @desc    get single Category
// @route   GET /api/Categories/:id
// @access  private
exports.getCategory = async (req, res, next) => {
  const category = await Category.findById(
    req.params.id
  ).populate('collections', 'documents')

  if (!category) {
    return next(
      new ErrorResponse(`catégorie introuvable`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: category,
  })
}

// @desc    update category
// @route   put /api/Categories/:id
// @access  private
exports.updateCategory = async (req, res, next) => {
  let category = await Category.findById(req.params.id)

  if (!category) {
    return next(
      new ErrorResponse(
        `category not found with id ${req.params.id}`,
        404
      )
    )
  }

  category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )

  res.status(200).json({
    success: true,
    message: 'catégorie modifiée avec succès',
    data: category,
  })
}

// @desc    dalete category
// @route   delete /api/Categories/:id
// @access  private
exports.deleteCategory = async (req, res, next) => {
  let category = await Category.findById(req.params.id)

  if (!category) {
    return next(
      new ErrorResponse(
        `category not found with id ${req.params.id}`,
        404
      )
    )
  }

  await Category.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: 'catégorie supprimée avec succès',
    data: {},
  })
}

// @desc    place category
// @route   put /api/Categories/:categoryId/collections/:collectionId
// @access  private
exports.placeCategory = async (req, res, next) => {
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
    { status: 'placed' },
    { new: true, runValidators: true }
  )

  res.status(200).json({
    success: true,
    message: 'catégorie placée avec succès',
    data: category,
  })
}
