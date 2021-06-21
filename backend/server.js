const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const http = require('http')
const SocketService = require('./utils/SocketService.js')
const { Server } = require('socket.io')
const connectDB = require('./config/db.js')
const { errorHandler } = require('./middlewares/error')

// load routes
const documentRoutes = require('./routes/documents')
const collectionRoutes = require('./routes/collections')
const categoryRoutes = require('./routes/categories')
const orderRoutes = require('./routes/orders')
const historyRoutes = require('./routes/histories')
const authRoutes = require('./routes/auth')

// load env variables
dotenv.config()

// connect to DB
connectDB()

const app = express()

// cors
app.use(cors())

// body parser
app.use(express.json())

// connect server with socket.io
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origins: ['*'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
  },
})

// Mount routers
app.use('/api/documents', documentRoutes)
app.use('/api/collections', collectionRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/auth', authRoutes)

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

server.listen(
  PORT,
  console.debug(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

io.on('connection', (socket) => {
  console.log('someone connected')
  app.set('socketService', new SocketService(socket))
})

// handel unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`${err}`)
  // close server & exit process
  server.close(() => {
    process.exit(1)
  })
})
