import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import types from './types';
import api from '../../../services/api';
import { setChairs, setDesks, setLighting, setProduct, setStock, setOrders } from './actions';
import Swal from 'sweetalert2';

export function* requestDesks() {
    const response = yield call(api.get, '/products/desks');
    const res = response.data;
    yield put(setDesks(res.deskProducts));
}

export function* requestChairs() {
    const response = yield call(api.get, '/products/chairs');
    const res = response.data;
    yield put(setChairs(res.chairProducts));
}

export function* requestLighting() {
    const response = yield call(api.get, '/products/Lighting');
    const res = response.data;
    yield put(setLighting(res.lightingProducts));
}

export function* requestStock() {
    const response = yield call(api.get, '/admin/stock');
    const res = response.data;
    yield put(setStock(res.products));
}

export function* requestProduct(p) {
    //console.log("Inside SAGA, ID: " + p);
    const response = yield call(api.get, `/product/${p.id}`);
    const res = response.data;
    //console.log("Inside SAGA requestProduct, res: " + JSON.stringify(res));
    yield put(setProduct(res.product));
}

export function* deleteProduct(p) {
    const response = yield call(api.post, '/admin/stock/delete', p);
    const res = response.data;
    if(res.error) {
        const msgs = (res.message).join(" ");
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: msgs                
        });
        return false;
    }
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product deleted!'
    });
}

export function* addProductQuantity(p) {
    const response = yield call(api.post, '/admin/stock/quantity/add', p);
    const res = response.data;
    if(res.error) {
        const msgs = (res.message).join(" ");
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: msgs                
        });
        return false;
    }
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Added one unit of this product!'
    });
}

export function* subProductQuantity(p) {
    const response = yield call(api.post, '/admin/stock/quantity/sub', p);
    const res = response.data;
    if(res.error) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: res.message               
        });
        return false;
    }
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Subtracted one unit of this product!'
    });
}

export function* makePurchase() {
    const { transaction } = yield select(state => state.products);
    const response = yield call(api.post, '/purchase', transaction);
    const res = response.data;
    if(res.error) {
        const msgs = (res.message).join(" ");
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: msgs                
        });
        return false;
    }
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your order has been placed.'
    });
}

export function* registerProduct() {
    const { product } = yield select(state => state.products);
    const response = yield call(api.post, '/admin/stock/add', product);
    const res = response.data;
    if(res.error) {
        const msgs = (res.message).join(" ");
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: msgs                
        });
        return false;
    }
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfull product registration!'
    });
}

export function* requestNewOrders() {
    const response = yield call(api.get, '/admin/orders/new');
    const res = response.data;
    yield put(setOrders(res.orders));
}

export function* requestNewOrdersUser(prop) {
    //console.log("Inside SAGA requestNewOrdersUser, ID: " + prop.id);
    const response = yield call(api.get, `/user/orders/${prop.id}`);
    const res = response.data;
    yield put(setOrders(res.orders));
}

export function* requestOldOrders() {
    const response = yield call(api.get, '/admin/orders/history');
    const res = response.data;
    yield put(setOrders(res.orders));
}

export function* requestOldOrdersUser(prop) {
    //console.log("Inside SAGA requestNewOrdersUser, ID: " + prop.id);
    const response = yield call(api.get, `/user/orders/history/${prop.id}`);
    const res = response.data;
    yield put(setOrders(res.orders));
}

export function* shipOrder(order) {
    const response = yield call(api.post, '/admin/orders/ship', order);
    //console.log("INSIDE SAGA, order:" + response);
    const res = response.data;
    if(res.error) {
        //const msgs = (res.message).join(" ");
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: res.message            
        });
        return false;
    }
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Order Shipped with success!'
    });
}

export default all([
    takeLatest(types.REQUEST_DESKS, requestDesks),
    takeLatest(types.REQUEST_CHAIRS, requestChairs),
    takeLatest(types.REQUEST_LIGHTING, requestLighting),
    takeLatest(types.REQUEST_STOCK, requestStock),
    takeLatest(types.REQUEST_PRODUCT, requestProduct),
    takeLatest(types.DELETE_PRODUCT, deleteProduct),
    takeLatest(types.MAKE_PURCHASE, makePurchase),
    takeLatest(types.ADD_PRODUCT_QUANTITY, addProductQuantity), 
    takeLatest(types.SUB_PRODUCT_QUANTITY, subProductQuantity),
    takeLatest(types.REGISTER_PRODUCT, registerProduct),
    takeLatest(types.REQUEST_NEW_ORDERS, requestNewOrders),
    takeLatest(types.REQUEST_NEW_ORDERS_USER, requestNewOrdersUser),
    takeLatest(types.SHIP_ORDER, shipOrder),
    takeLatest(types.REQUEST_OLD_ORDERS, requestOldOrders),
    takeLatest(types.REQUEST_OLD_ORDERS_USER, requestOldOrdersUser)
]);