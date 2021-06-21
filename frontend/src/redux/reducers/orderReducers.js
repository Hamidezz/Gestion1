import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDERS_GET_REQUEST,
  ORDERS_GET_SUCCESS,
  ORDERS_GET_FAIL,
} from '../constants/orderConstant'

export const createOrderReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload.data,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const getOrdersReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case ORDERS_GET_REQUEST:
      return {
        loading: true,
      }
    case ORDERS_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload.data,
      }
    case ORDERS_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
