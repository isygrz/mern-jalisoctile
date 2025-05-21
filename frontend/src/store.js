import {
  legacy_createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { thunk } from 'redux-thunk';
import { productListReducer } from './reducers/productReducers';
//import data from './data';

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
