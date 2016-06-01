import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import App from './app/containers/App';
import configureStore from './app/store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const rootEl = document.getElementById('root');
const store = configureStore();

function render() {
  ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
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
