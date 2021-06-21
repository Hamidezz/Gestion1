import React, { useState, useEffect } from 'react'
import { Toast } from 'react-bootstrap'
import { useSocketValue } from '../context/socket'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Notification = () => {
  const [showA, setShowA] = useState(false)

  // socket context
  const socket = useSocketValue()

  const [notification, setNotfication] = useState({
    text: '',
    collectionId: null,
  })
  const { userInfo } = useSelector(
    (state) => state.loginState
  )
  useEffect(() => {
    // show notification
    const isAuthorised = (...roles) => {
      return !userInfo
        ? false
        : roles.includes(userInfo.user.role)
    }
    const showNotification = (data) => {
      console.log(data)
      if (isAuthorised('service2')) {
        setNotfication({
          text: `${data.notification.text}`,
          collectionId: `${data.notification.collId}`,
        })
        setShowA(true)
      }
    }
    socket.on('notifySuccess', showNotification)
    return () => {
      socket.off('notifySuccess', showNotification)
    }
  }, [socket, userInfo])

  return (
    <Toast
      show={showA}
      onClose={() => setShowA(!showA)}
      style={{
        border: '2px solid var(--dark-red-clr)',
        position: 'absolute',
        bottom: '20px',
        left: '10px',
      }}
    >
      <Toast.Header
        style={{
          background: 'var(--dark-clr)',
        }}
      >
        <strong className="mr-auto">
          new collection
        </strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body
        style={{ background: 'var(--dark-red-clr)' }}
      >
        <Link
          to={`/collection/${notification.collectionId}`}
          style={{ color: '#fff' }}
        >
          {notification.text}
        </Link>
      </Toast.Body>
    </Toast>
  )
}

export default Notification
