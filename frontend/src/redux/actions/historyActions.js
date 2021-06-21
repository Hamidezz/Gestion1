import axios from 'axios'
import { SERVER_URL } from '../../config'

import {
  HISTORY_GET_REQUEST,
  HISTORY_GET_SUCCESS,
  HISTORY_GET_FAIL,
} from '../constants/historyConstants'

export const getHistories =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: HISTORY_GET_REQUEST,
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
        `${SERVER_URL}/api/history`,
        config
      )

      dispatch({
        type: HISTORY_GET_SUCCESS,
        payload: data,
      })
      console.log(data)
    } catch (err) {
      dispatch({
        type: HISTORY_GET_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }
