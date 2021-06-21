import axios from 'axios'
import { SERVER_URL } from '../../config'

import {
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from '../constants/categoryConstants'

// get all collections
export const getCategories =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_CATEGORIES_REQUEST,
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
        `${SERVER_URL}/api/categories`,
        config
      )

      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: data,
      })
      console.log(data)
    } catch (err) {
      console.log(err)
      dispatch({
        type: GET_CATEGORIES_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }

// get all collections
export const createCategory =
  (name) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_CATEGORY_REQUEST,
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

      const { data } = await axios.post(
        `${SERVER_URL}/api/categories`,
        {
          name,
        },
        config
      )

      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: data,
      })
      console.log(data)
    } catch (err) {
      console.log(err)
      dispatch({
        type: CREATE_CATEGORY_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }

// delete category

export const deleteCategory =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CATEGORY_DELETE_REQUEST,
      })

      const {
        loginState: {
          userInfo: { token },
        },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await axios.delete(
        `${SERVER_URL}/api/categories/${id}`,
        config
      )

      dispatch({
        type: CATEGORY_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: CATEGORY_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
