import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './components/App';
import './assets/styles/index';


if (process.env.NODE_ENV !== 'development' && window.Raven) {
  window.Raven.config('https://815d967b437e4f3b8119e6f51b8208a4@sentry.io/142675').install()
}


const middleware = applyMiddleware(thunk);
let store;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
   store = createStore(
    reducer, 
    compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );
} else {
    store = createStore(
    reducer, 
    compose(middleware)
  );
}


ReactDOM.render((
  <Provider store={store}>
    <App store={store}/>
  </Provider>
), document.getElementById('root'));
