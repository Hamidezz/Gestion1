const Document = require('../models/Document')
const ErrorResponse = require('../utils/ErrorResponse')

// @desc    Get documents
// @route   GET /api/documents
// @access  private
exports.getDocuments = async (req, res, next) => {
  const documents = await Document.find({}).populate(
    'category',
    'name'
  )
  res.json({ success: true, data: documents })
}

// @desc    Get single document
// @route   GET /api/documents/:id
// @access  private
exports.getDocument = async (req, res, next) => {
  const document = await Document.findById(
    req.params.id
  ).populate('category', 'name')

  if (!document) {
    return next(
      new ErrorResponse(
        `document not found with id ${req.params.id}`,
        404
      )
    )
  }

  res.json({ success: true, data: document })
}

// @desc    create document
// @route   Post /api/documents/:id
// @access  private
exports.createDocument = async (req, res, next) => {
  const document = await Document.create(req.body)

  res.status(200).json({
    success: true,
    data: document,
  })
}

// @desc    update document
// @route   put /api/documents/:id
// @access  private
exports.updateDocument = async (req, res, next) => {
  let document = Document.findById(req.params.id)

  // chek if doc exist
  if (!document) {
    return next(
      new ErrorResponse(
        `document not found with id ${req.params.id}`,
        400
      )
    )
  }

  // update doc
  document = await Document.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )
  res.status(200).json({
    success: true,
    data: document,
  })
}

// @desc    delete document
// @route   delete /api/documents/:id
// @access  private
exports.deleteDocument = async (req, res, next) => {
  const document = Document.findById(req.params.id)

  // chek if doc exist
  if (!document) {
    return next(
      new ErrorResponse(
        `document not found with id ${req.params.id}`,
        400
      )
    )
  }

  // delete doc
  await Document.findByIdAndRemove(req.params.id)
  res.status(200).json({
    success: true,
    data: {},
  })
}
