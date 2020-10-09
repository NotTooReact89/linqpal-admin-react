// @flow

import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import persistConfig from '../Config/ReduxPersist';
import rootReducer from '../Redux';
import rootSaga from '../Sagas';

export const history = createBrowserHistory();

const configureStore = (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();
  const persistedReducer = persistReducer(persistConfig, rootReducer(history));

  const middleware = [];
  middleware.push(sagaMiddleware);
  middleware.push(routerMiddleware(history));

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  persistStore(store);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
