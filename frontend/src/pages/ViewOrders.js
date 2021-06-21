import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Accordion } from 'react-bootstrap'
import Order from '../components/Order'
import { useMessageValue } from '../context/message'
import { getOrders } from '../redux/actions/orderActions'

const ViewOrders = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  // load user Info
  const { userInfo, error: authError } = useSelector(
    (state) => state.loginState
  )
  // load collections
  const { loading, error, orders } = useSelector(
    (state) => state.getOrdersState
  )

  useEffect(() => {
    const isAuthorised = (...roles) => {
      return !userInfo
        ? false
        : roles.includes(userInfo.user.role)
    }
    if (
      !userInfo ||
      isAuthorised('admin', 'service3') === false
    ) {
      history.push('/')
    } else {
      dispatch(getOrders())
    }
  }, [userInfo, history, authError, dispatch])

  // message cntext
  const { setMessage, setShowMessage, setVariant } =
    useMessageValue()

  // show message
  useEffect(() => {
    if (error) {
      setMessage(error)
      setVariant('danger')
      setShowMessage(true)
    }
  }, [error, setMessage, setShowMessage, setVariant])

  // accordion active key
  const [activeKey, setActiveKey] = useState('')
  return loading ? (
    <>loading ...</>
  ) : (
    <>
      <h1>Orders</h1>

      <Accordion onSelect={(e) => setActiveKey(e)}>
        {orders?.map((order) => (
          <div key={order._id}>
            <Order
              order={order}
              activeKey={activeKey}
            />
          </div>
        ))}
      </Accordion>

      {/*  */}
    </>
  )
}

export default ViewOrders
