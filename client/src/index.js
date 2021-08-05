import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';//ant design
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'; //원래 store는 객체만 받을수 있지만
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk';//위에 두개를 사용해서 promise, function을 받을 수 있게 해줌
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);


ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__&&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
