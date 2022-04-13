import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware  from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './modules/rootSaga';
import rootReducer from './modules/rootReducer';

/* NEW - ADDED redux-persist */
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
    key: 'root',
    storage
}
const persistedRootReducer = persistReducer(persistConfig, rootReducer);
/* ### */

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    // # 
    //rootReducer,
    persistedRootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     ? composeWithDevTools(applyMiddleware(sagaMiddleware))
     : applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

//FORMER: export default store;
export const persistor = persistStore(store)