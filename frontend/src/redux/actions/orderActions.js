import axios from 'axios'
import { SERVER_URL } from '../../config'
import { GET_COLLECTIONS_SUCCESS } from '../constants/collectionConstant'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDERS_GET_REQUEST,
  ORDERS_GET_SUCCESS,
  ORDERS_GET_FAIL,
} from '../constants/orderConstant'

export const placeOrder =
  (coll, recipient) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      })

      const {
        loginState: {
          userInfo: { token },
        },
        collectionsState: { collections },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.post(
        `${SERVER_URL}/api/orders`,
        { coll, recipient },
        config
      )

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })

      // remove coll from collection state
      const filtercollections = collections.filter(
        ({ _id }) => _id !== coll._id
      )
      dispatch({
        type: GET_COLLECTIONS_SUCCESS,
        payload: { data: filtercollections },
      })
    } catch (err) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }

export const getOrders =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDERS_GET_REQUEST,
      })

      const {
        loginState: {
          userInfo: { token },
        },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.get(
        `${SERVER_URL}/api/orders`,
        config
      )

      dispatch({
        type: ORDERS_GET_SUCCESS,
        payload: data,
      })
      console.log(data)
    } catch (err) {
      dispatch({
        type: ORDERS_GET_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }
