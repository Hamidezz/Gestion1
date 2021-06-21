const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'category name is required'],
      trim: true,
      maxlength: [
        50,
        'category can not be more than 50 characters',
      ],
    },
  },

  { timestamps: true }
)

module.exports = mongoose.model(
  'Category',
  CategorySchema
)
