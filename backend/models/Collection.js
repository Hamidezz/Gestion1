const mongoose = require('mongoose')

const CollectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    documents: [
      {
        doc: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'Document',
          required: [true, 'documents are required'],
        },
      },
    ],
    authority: {
      type: String,
      maxlength: [
        15,
        'authority cannot be more than 15 characters',
      ],
    },
    followed: {
      type: String,
      maxlength: [
        15,
        'followed cannot be more than 15 characters',
      ],
    },
    recipient: {
      type: String,
      maxlength: [
        15,
        'recipient cannot be more than 15 characters',
      ],
    },
    placedAt: {
      type: Date,
    },
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
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// revers populate wih virtuals
CollectionSchema.virtual('history', {
  ref: 'History',
  localField: '_id',
  foreignField: 'collectionId',
  justOne: false,
})

// update documents before saving new collection
CollectionSchema.pre('save', async function (next) {
  const docs = this.documents.map((doc) => doc.doc)
  await this.model('Document').updateMany(
    { _id: { $in: docs } },
    { $set: { status: 'pending' } },
    { multi: true }
  )
  next()
})
// update documents before updating collection to placed
// CollectionSchema.pre('findByIdAndUpdate', async function (next) {
//   const docs = this.documents.map((doc) => doc.doc)
//   await this.model('Document').updateMany(
//     { _id: { $in: docs } },
//     { $set: { status: 'pending' } },
//     { multi: true }
//   )
//   next()
// })

module.exports = mongoose.model(
  'Collection',
  CollectionSchema
)
