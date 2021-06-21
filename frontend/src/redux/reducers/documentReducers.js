import {
  GET_DOCUMENT_REQUEST,
  GET_DOCUMENT_SUCCESS,
  GET_DOCUMENT_FAIL,
  GET_SINGLE_DOC_REQUEST,
  GET_SINGLE_DOC_SUCCESS,
  GET_SINGLE_DOC_FAIL,
  DOCUMENT_CREATE_REQUEST,
  DOCUMENT_CREATE_SUCCESS,
  DOCUMENT_CREATE_FAIL,
  DOCUMENT_CREATE_RESET,
  DOCUMENT_DELETE_REQUEST,
  DOCUMENT_DELETE_SUCCESS,
  DOCUMENT_DELETE_FAIL,
  DOCUMENT_UPDATE_REQUEST,
  DOCUMENT_UPDATE_SUCCESS,
  DOCUMENT_UPDATE_FAIL,
} from '../constants/documentConstants'

export const getDocsReducer = (
  state = { documents: [] },
  action
) => {
  switch (action.type) {
    case GET_DOCUMENT_REQUEST:
      return {
        loading: true,
      }
    case GET_DOCUMENT_SUCCESS:
      return {
        loading: false,
        documents: action.payload.data,
      }
    case GET_DOCUMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const getSingleDocReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_SINGLE_DOC_REQUEST:
      return {
        loading: true,
      }
    case GET_SINGLE_DOC_SUCCESS:
      return {
        loading: false,
        document: action.payload.data,
      }
    case GET_SINGLE_DOC_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const createDocReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case DOCUMENT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case DOCUMENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        document: action.payload.data,
      }
    case DOCUMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case DOCUMENT_CREATE_RESET:
      return {}

    default:
      return state
  }
}

export const updateDocumentReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case DOCUMENT_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case DOCUMENT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        document: action.payload.data,
      }
    case DOCUMENT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const deleteDocumentReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case DOCUMENT_DELETE_REQUEST:
      return {
        loading: true,
      }
    case DOCUMENT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case DOCUMENT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
