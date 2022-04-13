import produce from 'immer';
import types from './types';

const INITIAL_STATE = {
    desks: [],
    chairs: [],
    lighting: [],
    stock: [],
    product: {},
    cart: [],
    transaction:{},
    orders: []
};

function products(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.SET_DESKS: 
            return produce(state, (draft) => {
                draft.desks = action.desks;
            });
        case types.SET_CHAIRS:
            return produce(state, (draft) => {
                draft.chairs = action.chairs;
            });
        case types.SET_LIGHTING:
            return produce(state, (draft) => {
                draft.lighting = action.lighting;
            });
        case types.SET_ORDERS:
            return produce(state, (draft) => {
                draft.orders = action.orders;
            });
        case types.SET_STOCK:
            return produce(state, (draft) => {
                draft.stock = action.stock;
            });
        case types.SET_PRODUCT:
            return produce(state, (draft) => {
                draft.product = action.product;
            });
        case types.ADD_PRODUCT_TO_CART:
            return produce(state, (draft) => {
                draft.cart.push(action.product);
            });
        case types.REMOVE_PRODUCT_FROM_CART:
            return produce(state, (draft) => {
                const index = draft.cart.findIndex((p) => p._id === action.product._id);
                if(index !== -1){
                    draft.cart.splice(index, 1);
                }  
            });
        case types.SET_TRANSACTION:
            return produce(state, (draft) => {
                draft.transaction = { ...draft.transaction, ...action.transaction};
            });
        default:
            return state;
    }
}

export default products;