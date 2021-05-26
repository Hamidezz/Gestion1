const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model(
  'Notification',
  NotificationSchema
)
