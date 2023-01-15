import {createStore, combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'
import { cartSlice } from './cart/cart.slice'

const reducers = {
  toastr: toastrReducer,
  cart: cartSlice.reducer
}

const reducer = combineReducers(reducers)
const store = createStore(reducer)

export default store