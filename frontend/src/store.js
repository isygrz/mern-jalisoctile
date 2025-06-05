import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import { thunk } from 'redux-thunk';

import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer } from './reducers/userReducers';

// ✅ Load cart items and user info from localStorage, if available
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// ✅ Preloaded initial state
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userSignin: {
    userInfo: userInfoFromStorage,
  },
};

// ✅ Root reducer
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
});

// ✅ Redux DevTools support
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ✅ Create Redux store
const Store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default Store;
