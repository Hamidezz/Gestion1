import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const userInfoFromLocalStorage = localStorage.getItem(
  'userInfo'
)
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  loginState: {
    userInfo: userInfoFromLocalStorage,
  },
}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
)

export default store
