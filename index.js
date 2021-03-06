import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './app/containers/App';
import RecordsEditor from './app/components/RecordsEditor';
import RecordsList from './app/components/RecordsList';
import configureStore from './app/store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const rootEl = document.getElementById('root');
const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

function render() {
  ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={RecordsList} />
            <Route path="/:id" component={RecordsEditor} />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  ,
    rootEl
  );
}

render();
