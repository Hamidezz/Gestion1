import React, {
  createContext,
  useContext,
  useState,
} from 'react'

export const MessageContext = createContext()

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(
    'yeah we are ready to use this'
  )
  const [showMessage, setShowMessage] = useState(false)
  const [variant, setVariant] = useState('info')
  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        showMessage,
        setShowMessage,
        variant,
        setVariant,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export const useMessageValue = () =>
  useContext(MessageContext)
