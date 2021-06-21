// const socketIo = require('socket.io')

class SocketService {
  constructor(socket) {
    this.io = socket
  }

  emiter(event, body) {
    // if (body) this.io.emit(event, body)
    if (body) this.io.broadcast.emit(event, body)
  }
}

module.exports = SocketService
