import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RipangaComponent from './Ripanga';
import reducer from './RipangaReducer';

const store = createStore(
  combineReducers({ reducer }),
  {},
  applyMiddleware(thunk),
);

const RipangaProvider = props => (
  <Provider store={store}>
    <RipangaComponent {...props} />
  </Provider>
);

export default RipangaProvider;
