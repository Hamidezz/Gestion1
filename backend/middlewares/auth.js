const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/ErrorResponse')
const User = require('../models/User')

// protect Routes
exports.protect = async (req, res, next) => {
  let token

  // split token from headers->authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token
  // }

  if (!token) {
    next(
      new ErrorResponse('Not authorize, no token', 401)
    )
  }

  try {
    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = await User.findById(decoded.id)

    next()
  } catch (err) {
    // console.log(err)
    return next(
      new ErrorResponse(
        'Not authorize, token failed',
        401
      )
    )
  }
}

// Grant access for specific roles

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User ${req.user.name} is not authorizd to do this action`,
          403
        )
      )
    }
    next()
  }
}
