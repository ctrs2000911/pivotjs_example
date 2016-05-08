import * as TYPES from '../constants/ChartOptionTypes';

const initialState = {
  showSubTotal: false,
  showTotal: true,
};

const chartOptions = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CHANGE_SHOW_SUB_TOTAL:
      return Object.assign({}, state, { showSubTotal: !state.showSubTotal });
    case TYPES.CHANGE_SHOW_TOTAL:
      return Object.assign({}, state, { showTotal: !state.showTotal });
    default:
      return state;
  }
};

export default chartOptions;
