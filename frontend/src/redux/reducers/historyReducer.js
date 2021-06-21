import {
  HISTORY_GET_REQUEST,
  HISTORY_GET_SUCCESS,
  HISTORY_GET_FAIL,
} from '../constants/historyConstants'

export const getHistoriesReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case HISTORY_GET_REQUEST:
      return {
        loading: true,
      }
    case HISTORY_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        histories: action.payload.data,
      }
    case HISTORY_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
