const mongoose = require('mongoose')

const HistorySchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    collectionId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Collection',
    },
    sent: Boolean,
    sorted: Boolean,
    placed: Boolean,
  },
  { timestamps: true }
)

module.exports = mongoose.model(
  'History',
  HistorySchema
)
