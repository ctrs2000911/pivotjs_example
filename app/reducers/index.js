import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import chartOptions from './chartOptions';
import pivot from './pivot';

const rootReducer = combineReducers({
  chartOptions,
  pivot,
  routing: routerReducer,
});

export default rootReducer;
