import { combineReducers } from 'redux';
import chartOptions from './chartOptions';
import pivot from './pivot';

const rootReducer = combineReducers({
  chartOptions,
  pivot,
});

export default rootReducer;
