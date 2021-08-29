import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from './store/reducer';
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchSetQuestions } from "./sagas/saga"

//create saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer,applyMiddleware(sagaMiddleware));

//conect saga active saga
sagaMiddleware.run(watchSetQuestions)
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
        </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
