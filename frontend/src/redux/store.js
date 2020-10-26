import { createStore, combineReducers,  applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/product.reducers';
import { cartReducer } from './reducers/cart.reducers';
import { userLoginReducer } from './reducers/user.reducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
});

const cartProductItemsFromStorage = localStorage.getItem('cart') 
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    cart: { cartProductItems: cartProductItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;