import React, {
  createContext,
  useContext,
} from 'react'
import socketio from 'socket.io-client'
import { SERVER_URL } from '../config'

export const socket = socketio(SERVER_URL, {
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
})
export const SocketContext = createContext()

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
)

export const useSocketValue = () =>
  useContext(SocketContext)
