const History = require('../models/History')
const ErrorResponse = require('../utils/ErrorResponse')

exports.getHistories = async (req, res, next) => {
  let histories

  try {
    histories = await History.find({}).populate(
      'document category order'
    )
  } catch (err) {
    return next(
      new ErrorResponse(
        'something went wrong please try again later',
        400
      )
    )
  }

  res.status(200).json({
    success: true,
    data: histories,
  })
}
