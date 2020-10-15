import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage
};
const sagaMiddleware = createSagaMiddleware();
//const enhancedReducer = persistReducer(persistConfig, rootReducer);
const enhancedReducer = rootReducer;
const store = createStore(
  enhancedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

// const persistor = persistStore(store);

ReactDOM.render(
  
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
