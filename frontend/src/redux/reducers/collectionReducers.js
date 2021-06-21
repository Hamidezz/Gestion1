import {
  COLLECTIO_CREATE_REQUEST,
  COLLECTIO_CREATE_SUCCESS,
  COLLECTIO_CREATE_FAIL,
  GET_COLLECTIONS_REQUEST,
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_FAIL,
  //
  ADD_COLL_TO_CATE_FAIL,
  ADD_COLL_TO_CATE_REQUEST,
  ADD_COLL_TO_CATE_SUCCESS,
  //
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DELETE_FAIL,
} from '../constants/collectionConstant'

export const createCollectionReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case COLLECTIO_CREATE_REQUEST:
      return {
        loading: true,
      }
    case COLLECTIO_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        collection: action.payload,
      }
    case COLLECTIO_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

// get collections
export const getCollectionReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_COLLECTIONS_REQUEST:
      return {
        loading: true,
      }
    case GET_COLLECTIONS_SUCCESS:
      return {
        loading: false,
        success: true,
        collections: action.payload.data,
      }
    case GET_COLLECTIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const addCollToCategory = (
  state = { category: [] },
  action
) => {
  switch (action.type) {
    case ADD_COLL_TO_CATE_REQUEST:
      return {
        loading: true,
      }
    case ADD_COLL_TO_CATE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload.data,
      }
    case ADD_COLL_TO_CATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const deleteCollReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case COLLECTION_DELETE_REQUEST:
      return {
        loading: true,
      }
    case COLLECTION_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case COLLECTION_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
