import { combineReducers } from 'redux';
import products from './products/reducer';
import user from './user/reducer';

export default combineReducers({
    user: user,
    products: products
});