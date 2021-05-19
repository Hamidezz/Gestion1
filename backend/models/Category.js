const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, 'category is required'],
      trim: true,
      maxlength: [
        50,
        'category can not be more than 50 characters',
      ],
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
)

// revers populate wih virtuals
CategorySchema.virtual('documents', {
  ref: 'Document',
  localField: '_id',
  foreignField: 'category',
  justOne: false,
})

module.exports = mongoose.model(
  'Category',
  CategorySchema
)
