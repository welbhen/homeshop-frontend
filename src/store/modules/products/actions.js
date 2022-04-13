import types from './types';

export function requestDesks() {
    return {
        type: types.REQUEST_DESKS
    };
}

export function requestChairs() {
    return {
        type: types.REQUEST_CHAIRS
    };
}

export function requestLighting() {
    return {
        type: types.REQUEST_LIGHTING
    };
}

export function setDesks(desks) {
    return {
        type: types.SET_DESKS,
        desks
    };
}

export function setChairs(chairs) {
    return {
        type: types.SET_CHAIRS,
        chairs
    };
}

export function setLighting(lighting) {
    return {
        type: types.SET_LIGHTING,
        lighting
    };
}

export function requestStock() {
    return {
        type: types.REQUEST_STOCK
    };
}

export function setStock(stock) {
    return {
        type: types.SET_STOCK,
        stock
    };
}

export function addProductToCart(product) {
    return {
        type: types.ADD_PRODUCT_TO_CART,
        product
    };
}

export function removeProductFromCart(product) {
    return {
        type: types.REMOVE_PRODUCT_FROM_CART,
        product
    };
}

export function addProductQuantity(id) {
    return {
        type: types.ADD_PRODUCT_QUANTITY,
        id
    };
}

export function subProductQuantity(id) {
    return {
        type: types.SUB_PRODUCT_QUANTITY,
        id
    };
} 

export function deleteProduct(id) {
    return {
        type: types.DELETE_PRODUCT,
        id
    };
}

export function requestProduct(id) {
    return {
        type: types.REQUEST_PRODUCT,
        id
    };
}

export function setProduct(product) {
    return {
        type: types.SET_PRODUCT,
        product
    };
}

export function setTransaction(transaction) {
    return {
        type: types.SET_TRANSACTION,
        transaction
    };
}

export function makePurchase() {
    return {
        type: types.MAKE_PURCHASE,
    };
}

export function registerProduct() {
    return {
        type: types.REGISTER_PRODUCT,
    };
}

export function requestNewOrders() {
    return {
        type: types.REQUEST_NEW_ORDERS,
    };
}

export function requestNewOrdersUser(id) {
    return {
        type: types.REQUEST_NEW_ORDERS_USER,
        id
    };
}

export function requestOldOrders() {
    return {
        type: types.REQUEST_OLD_ORDERS,
    };
}

export function requestOldOrdersUser(id) {
    return {
        type: types.REQUEST_OLD_ORDERS_USER,
        id
    };
}

export function setOrders(orders) {
    return {
        type: types.SET_ORDERS,
        orders
    };
}

export function shipOrder(order) {
    return {
        type: types.SHIP_ORDER,
        order
    };
}