const mongoose = require('mongoose')

const DocumentSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      default: null,
    },
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
      trim: true,
      maxlength: [
        50,
        'firstName can not be more than 50 characters',
      ],
    },
    lastName: {
      type: String,
      required: [true, 'lastName is required'],
      trim: true,
      maxlength: [
        50,
        'lastName can not be more than 50 characters',
      ],
    },
    objet: {
      type: String,
      required: [true, 'object is required'],
      trim: true,
      maxlength: [
        50,
        'object can not be more than 50 characters',
      ],
    },
    cin: {
      type: String,
      required: [true, 'cin is required'],
      maxlength: [
        50,
        'cin can not be more than 500 characters',
      ],
    },
    province: {
      type: String,
      required: [true, 'province is required'],
      maxlength: [
        50,
        'province can not be more than 50 characters',
      ],
    },
    city: {
      type: String,
      required: [true, 'city is required'],
      maxlength: [
        50,
        'city can not be more than 50 characters',
      ],
    },
    documentNum: {
      type: Number,
      required: [true, 'document number is required'],
    },
    date: {
      type: Date,
      default: Date.now(),
      required: [true, 'date is required'],
    },
    profession: {
      type: String,
      required: [true, 'profession is required'],
      maxlength: [
        50,
        'profession can not be more than 50 characters',
      ],
    },
    address: {
      type: String,
      required: [true, 'address is required'],
    },
    resume: {
      type: String,
      required: [true, 'resume is required'],
      maxlength: [
        500,
        'resume can not be more than 500 characters',
      ],
    },
    status: {
      type: String,
      enum: ['new', 'pending', 'placed'],
      default: 'new',
    },
  },
  { timestamps: true }
)

// Cascad delete document from collection when a document is deleted
DocumentSchema.pre('remove', async function (next) {
  await this.model('Collection').updateOne(
    {
      documents: { $elemMatch: { doc: this._id } },
    },
    {
      $pull: {
        documents: { doc: this._id },
      },
    }
  )

  next()
})
module.exports = mongoose.model(
  'Document',
  DocumentSchema
)
