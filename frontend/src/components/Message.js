import React from 'react'
import { Toast } from 'react-bootstrap'
import { useMessageValue } from '../context/message'

const Message = () => {
  const {
    message,
    showMessage,
    setShowMessage,
    variant,
  } = useMessageValue()

  return (
    <Toast
      delay={6000}
      autohide
      style={{
        position: 'absolute',
        zIndex: 1111,
        top: 0,
        right: 0,
      }}
      as="h2"
      className={`bg-${variant} m-4`}
      show={showMessage}
      onClose={() => setShowMessage(false)}
    >
      <Toast.Header>
        <small className="mr-auto">
          {variant === 'danger' ? 'Error' : 'success'}
        </small>
      </Toast.Header>
      <Toast.Body
        as="h6"
        className={`text-${
          variant !== 'light' ? 'light' : 'dark'
        }`}
      >
        {message}
      </Toast.Body>
    </Toast>
  )
}

export default Message
