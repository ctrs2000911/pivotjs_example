import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/containers/App';
import configureStore from './app/store/configureStore';

const rootEl = document.getElementById('root');
const store = configureStore();

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  ,
    rootEl
  );
}

render();

// store.subscribe(() => {
//   const state = store.getState();
//   const dataset = state.dataset;
//   console.log(state, dataset);
// });
