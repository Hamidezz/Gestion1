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
    sentAt: Date,
    sorted: Boolean,
    sortedAt: Date,
    placed: Boolean,
    placedAt: Date,
  },
  { timestamps: true }
)

module.exports = mongoose.model(
  'History',
  HistorySchema
)
