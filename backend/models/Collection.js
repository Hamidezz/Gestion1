const mongoose = require('mongoose')

const CollectionSchema = mongoose.Schema(
  {
    documents: [
      {
        doc: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'Document',
          required: [true, 'documents are required'],
        },
      },
    ],
    historyId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'History',
    },
    status: {
      type: String,
      enum: ['new', 'sorted', 'placed'],
      default: 'new',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
)

// revers populate wih virtuals
CollectionSchema.virtual('history', {
  ref: 'History',
  localField: '_id',
  foreignField: 'collectionId',
  justOne: false,
})

module.exports = mongoose.model(
  'Collection',
  CollectionSchema
)
