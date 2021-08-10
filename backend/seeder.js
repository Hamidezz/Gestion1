const fs = require('fs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// load env vars
dotenv.config()

// load models
const User = require('./models/User')

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const users = JSON.parse(
  fs.readFileSync(
    `${__dirname}/_data/users.json`,
    'utf-8'
  )
)

// import into DB
const importData = async () => {
  //   console.log(__dirname)
  const usersExist = await User.find({
    role: 'admin',
  })

  if (usersExist.length === 0) {
    try {
      await User.create(users)
      console.log('data imported...')
      process.exit(0)
    } catch (err) {
      console.log('err in seeder', err)
    }
  } else {
    console.log(
      'admin is already there',
      usersExist.length
    )
  }
}

importData()