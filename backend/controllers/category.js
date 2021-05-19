const Category = require('../models/Category')

// @desc    Get Categories
// @route   GET /api/Categories
// @access  private
exports.getCategories = async (req, res, next) => {
  const Categories = await Category.find().populate(
    'documents',
    'cin nom'
  )
  res.json({ success: true, data: Categories })
}

// @desc    create Category
// @route   POST /api/Categories
// @access  private
exports.createCategory = async (req, res, next) => {
  const category = await Category.create(req.body)

  res.status(200).json({
    success: true,
    data: category,
  })
}

// @desc    get single Category
// @route   GET /api/Categories/:id
// @access  private
exports.getCategory = async (req, res, next) => {
  const category = await Category.findById(
    req.params.id
  ).populate('documents')

  if (!category) {
    console.log('cate not found')
  }

  res.status(200).json({
    success: true,
    data: category,
  })
}
