import axios from 'axios'
import { SERVER_URL } from '../../config'
import {
  GET_DOCUMENT_REQUEST,
  GET_DOCUMENT_SUCCESS,
  GET_DOCUMENT_FAIL,
  DOCUMENT_CREATE_REQUEST,
  DOCUMENT_CREATE_SUCCESS,
  DOCUMENT_CREATE_FAIL,
  DOCUMENT_DELETE_REQUEST,
  DOCUMENT_DELETE_SUCCESS,
  DOCUMENT_DELETE_FAIL,
  GET_SINGLE_DOC_REQUEST,
  GET_SINGLE_DOC_SUCCESS,
  GET_SINGLE_DOC_FAIL,
  DOCUMENT_UPDATE_REQUEST,
  DOCUMENT_UPDATE_SUCCESS,
  DOCUMENT_UPDATE_FAIL,
} from '../constants/documentConstants'

export const getDocuments =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_DOCUMENT_REQUEST,
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
        `${SERVER_URL}/api/documents`,
        config
      )

      dispatch({
        type: GET_DOCUMENT_SUCCESS,
        payload: data,
      })
    } catch (err) {
      dispatch({
        type: GET_DOCUMENT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }

export const getSingleDoc =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_SINGLE_DOC_REQUEST,
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
        `${SERVER_URL}/api/documents/${id}`,
        config
      )

      dispatch({
        type: GET_SINGLE_DOC_SUCCESS,
        payload: data,
      })
      console.log(data)
    } catch (err) {
      console.log(err)
      dispatch({
        type: GET_SINGLE_DOC_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }

// create new document action
export const createNewDocument =
  (document) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCUMENT_CREATE_REQUEST,
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
        `${SERVER_URL}/api/documents`,
        document,
        config
      )

      dispatch({
        type: DOCUMENT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (err) {
      dispatch({
        type: DOCUMENT_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }

// delete document
export const updateDocument =
  (document, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCUMENT_UPDATE_REQUEST,
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
      const { data } = await axios.put(
        `${SERVER_URL}/api/documents/${id}`,
        document,
        config
      )

      dispatch({
        type: DOCUMENT_UPDATE_SUCCESS,
        paylaod: data,
      })
    } catch (error) {
      dispatch({
        type: DOCUMENT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

// delete document
export const deleteDocument =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCUMENT_DELETE_REQUEST,
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
        `${SERVER_URL}/api/documents/${id}`,
        config
      )

      dispatch({
        type: DOCUMENT_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: DOCUMENT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
