const Collection = require('../models/Collection')
const Document = require('../models/Document')
const History = require('../models/History')
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
  const { documentNum } = req.body

  const existDoc = await Document.findOne({
    documentNum,
  })

  if (existDoc) {
    return next(
      new ErrorResponse(
        `a document with number ${documentNum} already taken`,
        400
      )
    )
  }

  let document

  try {
    document = await Document.create(req.body)
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(
        new ErrorResponse(
          'veuillez remplir toutes les entrées',
          400
        )
      )
    }
  }

  // create new history
  await History.create({
    document,
  })

  res.status(200).json({
    success: true,
    message: 'nouveau document créé avec succès',
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

  try {
    document = await Document.findByIdAndUpdate(
      req.params.id,
      req.body
    )

    res.status(200).json({
      success: true,
      message: 'document modifiée créé avec succès',
      data: document,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log(err)
      return next(
        new ErrorResponse(
          'veuillez remplir toutes les entrées',
          400
        )
      )
    }
  }
}

// @desc    delete document
// @route   delete /api/documents/:id
// @access  private
exports.deleteDocument = async (req, res, next) => {
  const document = await Document.findById(
    req.params.id
  )

  // chek if doc exist
  if (!document) {
    return next(
      new ErrorResponse(
        `document not found with id ${req.params.id}`,
        400
      )
    )
  }

  await Collection.deleteMany({
    documents: {
      $elemMatch: { doc: document._id },
      $size: 1,
    },
  })

  document.remove()
  res.status(200).json({
    success: true,
    message: 'document supprimée créé avec succès',
    data: {},
  })
}
