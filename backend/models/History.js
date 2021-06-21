const mongoose = require('mongoose')

const HistorySchema = mongoose.Schema(
  {
    document: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Document',
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
    },
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Order',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model(
  'History',
  HistorySchema
)
