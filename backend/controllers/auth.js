const ErrorResponse = require('../utils/ErrorResponse')
const User = require('../models/User')

// @desc    Register user
// @route   POST /api/auth/register
// @access  public
exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body

  const userExist = await User.findOne({ email })

  // check if user exist
  if (userExist) {
    return next(
      new ErrorResponse(
        `User with email ${email} already exists`,
        400
      )
    )
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  })

  if (user) {
    res.status(201).json({
      user,
      token: user.generateToken(),
    })
  } else {
    return next(
      new ErrorResponse('invalide credentials', 400)
    )
  }
}

// @desc    login user
// @route   POST /api/auth/login
// @access  public
exports.login = async (req, res, next) => {
  const { email, password } = req.body

  //   validate email and password
  if (!email || !password) {
    return next(
      new ErrorResponse(
        `please provide a valid email and password`,
        400
      )
    )
  }

  // check for user
  const user = await User.findOne({ email }).select(
    '+password'
  )
  if (!user) {
    return next(
      new ErrorResponse('Invalid credentials', 401)
    )
  }

  //   check if password is matches
  const isMatch = user.matchPassword(password)
  if (!isMatch) {
    return next(
      new ErrorResponse('Invalid password', 401)
    )
  }

  return res.json({
    success: true,
    user,
    token: user.generateToken(),
  })
}

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, date: user })
  } catch (err) {
    return next(
      new ErrorResponse('Invalid credentials', 401)
    )
  }
}

// @desc    Log user out & clear the cookie
// @route   get /api/auth/logout
// @access  private
exports.logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({ success: true, data: {} })
}
