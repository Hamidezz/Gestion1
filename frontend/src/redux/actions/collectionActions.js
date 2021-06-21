import axios from 'axios'
import { SERVER_URL } from '../../config'
import {
  COLLECTIO_CREATE_REQUEST,
  COLLECTIO_CREATE_SUCCESS,
  COLLECTIO_CREATE_FAIL,
  GET_COLLECTIONS_REQUEST,
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_FAIL,
  ADD_COLL_TO_CATE_FAIL,
  ADD_COLL_TO_CATE_REQUEST,
  ADD_COLL_TO_CATE_SUCCESS,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DELETE_FAIL,
} from '../constants/collectionConstant'

// create new collection with given documents action
export const addDocsToCollection =
  (documents) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COLLECTIO_CREATE_REQUEST,
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
        `${SERVER_URL}/api/collections`,
        { documents },
        config
      )

      dispatch({
        type: COLLECTIO_CREATE_SUCCESS,
        payload: data,
      })
    } catch (err) {
      dispatch({
        type: COLLECTIO_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }

// get all collections
export const getCollections =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_COLLECTIONS_REQUEST,
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
        `${SERVER_URL}/api/collections`,
        config
      )

      dispatch({
        type: GET_COLLECTIONS_SUCCESS,
        payload: data,
      })
      console.log(data)
    } catch (err) {
      console.log(err)
      dispatch({
        type: GET_COLLECTIONS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }

// add category to collection
export const addCateToColl =
  (collId, cateId, authority, followed) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_COLL_TO_CATE_REQUEST,
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

      const { data } = await axios.put(
        `${SERVER_URL}/api/collections/add/${collId}/Categories/${cateId}`,
        { authority, followed },
        config
      )

      dispatch({
        type: ADD_COLL_TO_CATE_SUCCESS,
        payload: data,
      })
    } catch (err) {
      console.log(err)
      dispatch({
        type: ADD_COLL_TO_CATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }

// delete collection

export const deleteCollection =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COLLECTION_DELETE_REQUEST,
      })

      const {
        loginState: {
          userInfo: { token },
        },
        collectionsState: { collections },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await axios.delete(
        `${SERVER_URL}/api/collections/${id}`,
        config
      )

      dispatch({
        type: COLLECTION_DELETE_SUCCESS,
      })

      // remove coll from collection state
      const filtercollections = collections.filter(
        (coll) => coll._id !== id
      )
      dispatch({
        type: GET_COLLECTIONS_SUCCESS,
        payload: { data: filtercollections },
      })
    } catch (error) {
      dispatch({
        type: COLLECTION_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
