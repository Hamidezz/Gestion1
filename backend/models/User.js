const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please add a name'],
      trim: true,
      maxLength: [
        50,
        'Name can not be more than 50 characters',
      ],
    },
    email: {
      type: String,
      required: [true, 'please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'please add a valid email',
      ],
    },
    role: {
      type: String,
      enum: [
        'service1',
        'service2',
        'service3',
        'admin',
      ],
      default: 'service1',
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
      minlength: [6, 'msg li bghiti '],
      select: false,
    },
  },
  { timestamps: true }
)

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(
    this.password,
    salt
  )
})

// Match user entered password to hashed password in DB
UserSchema.methods.matchPassword = async function (
  pass
) {
  return await bcrypt.compare(pass, this.password)
}

// Sign JWT and return
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET
  )
}

module.exports = mongoose.model('User', UserSchema)
