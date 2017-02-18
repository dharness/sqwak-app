import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './components/App';
import './assets/styles/index';


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
