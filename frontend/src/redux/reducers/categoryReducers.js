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

export const getCategoriesReducer = (
  state = { categories: [] },
  action
) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        loading: true,
      }
    case GET_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload.data,
      }
    case GET_CATEGORIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const createNewCateReducer = (
  state = { category: [] },
  action
) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        loading: true,
      }
    case CREATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        categories: action.payload.data,
      }
    case CREATE_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const deleteCateReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return {
        loading: true,
      }
    case CATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CATEGORY_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
