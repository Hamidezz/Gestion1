const Category = require('../models/Category')
const Document = require('../models/Document')

// @desc    Get documents
// @route   GET /api/documents
// @access  private
exports.getDocuments = async (req, res, next) => {
  const documents = await Document.find({}).populate(
    'category'
  )
  res.json({ success: true, data: documents })
}

// @desc    create document
// @route   Post /api/:categoryId/documents
// @access  private
exports.createDocument = async (req, res, next) => {
  req.body.category = req.params.categoryId

  const category = await Category.findById(
    req.params.categoryId
  )

  if (!category) {
    console.log('category not found')
    // return next(
    //   new ErrorResponse(
    //     `bootcamp Not found with id ${req.params.bootcampId}`,
    //     404
    //   )
    // )
  }

  const document = await Document.create(req.body)

  res.status(200).json({
    success: true,
    data: document,
  })
}
