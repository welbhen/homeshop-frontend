import { all } from 'redux-saga/effects';
import products from './products/sagas';
import user from './user/sagas';

export default function* rootSaga() {
    return yield all([
        products,
        user
    ]);
};