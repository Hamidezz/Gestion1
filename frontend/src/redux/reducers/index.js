import { combineReducers } from 'redux'
import {
  loginReducer,
  registerReducer,
} from './userReducers'
import {
  getDocsReducer,
  createDocReducer,
  deleteDocumentReducer,
  updateDocumentReducer,
  getSingleDocReducer,
} from './documentReducers'
import {
  createCollectionReducer,
  getCollectionReducer,
  addCollToCategory,
  deleteCollReducer,
} from './collectionReducers'
import {
  getCategoriesReducer,
  createNewCateReducer,
  deleteCateReducer,
} from './categoryReducers'
import {
  createOrderReducer,
  getOrdersReducer,
} from './orderReducers'
import { getHistoriesReducer } from './historyReducer'

export default combineReducers({
  // auth
  loginState: loginReducer,
  registerState: registerReducer,
  // documents
  docsState: getDocsReducer,
  newDocState: createDocReducer,
  deleteDocState: deleteDocumentReducer,
  updateDocState: updateDocumentReducer,
  getSingleDocState: getSingleDocReducer,
  //collections
  collectionsState: getCollectionReducer,
  newCollectionState: createCollectionReducer,
  addCollToCateState: addCollToCategory,
  deleteCollState: deleteCollReducer,
  //categories
  categoriesState: getCategoriesReducer,
  newCateState: createNewCateReducer,
  deleteCateState: deleteCateReducer,
  // orders
  createOrderState: createOrderReducer,
  getOrdersState: getOrdersReducer,
  // history
  getHistoriesState: getHistoriesReducer,
})
