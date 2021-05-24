const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'category name is required'],
      unique: true,
      trim: true,
      maxlength: [
        50,
        'category can not be more than 50 characters',
      ],
    },
    authority: {
      type: String,
      required: [true, 'authority is required'],
      maxlength: [
        15,
        'authority can not be more than 15 characters',
      ],
    },
    followed: {
      type: String,
      required: [true, 'followed  is required'],
      maxlength: [
        15,
        'followed not be more than 15 characters',
      ],
    },
    recipient: {
      type: String,
      maxlength: [
        15,
        'recipient not be more than 15 characters',
      ],
    },
    numberPhone: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    collections: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Collection',
      },
    ],
  },

  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // },
  { timestamps: true }
)

// revers populate wih virtuals
// CategorySchema.virtual('documents', {
//   ref: 'Document',
//   localField: '_id',
//   foreignField: 'category',
//   justOne: false,
// })

module.exports = mongoose.model(
  'Category',
  CategorySchema
)
