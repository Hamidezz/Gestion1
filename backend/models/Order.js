const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema(
  {
    documents: [
      {
        doc: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Document',
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order', OrderSchema)
