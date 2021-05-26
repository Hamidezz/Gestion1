const express = require('express')
const dotenv = require('dotenv')
const { createServer } = require('http')
const socketIo = require('socket.io')
const connectDB = require('./config/db.js')
const { errorHandler } = require('./middlewares/error')

// load routes
const documentRoutes = require('./routes/documents')
const collectionRoutes = require('./routes/collections')
const categoryRoutes = require('./routes/categories')
const authRoutes = require('./routes/auth')

// load env variables
dotenv.config()

// connect to DB
connectDB()

// connect server with socket.io
const app = express()
const createdServer = createServer(app)
const io = socketIo(createdServer)

// body parser
app.use(express.json())

// middleware to pass io object to request
app.use((req, res, next) => {
  req.io = io
  return next()
})

// Mount routers
app.use('/api/documents', documentRoutes)
app.use('/api/collections', collectionRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/auth', authRoutes)

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = createdServer.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

// handel unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`${err}`)
  // close server & exit process
  server.close(() => {
    process.exit(1)
  })
})
