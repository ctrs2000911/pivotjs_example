import * as TYPES from '../constants/PivotTypes.js';
import _ from 'lodash';
import { Pivot } from 'pivotjs';
import guid from '../utils/utils';

const initialState = {
  recordString: '[]',
  records: [],
  rows: [],
  cols: [],
  measures: [],
  pivotTableData: null,
};

const populate = (state, diff = {}) => {
  let param = {
    records: state.records,
    rows: state.rows,
    cols: state.cols,
    measures: state.measures,
  };

  param = Object.assign({}, param, diff);
  const pivotTableData = new Pivot(param);
  pivotTableData.populate();

  return pivotTableData;
};

const pivot = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.POPULATE: {
      const pivotTableData = populate(state);

      return Object.assign({}, state, { pivotTableData });
    }

    // record
    case TYPES.CHANGE_RECORDS: {
      const records = JSON.parse(action.recordString.replace(/\n/g, ''));
      const newState = {
        recordString: action.recordString,
        records,
      };

      const keys = _.keys(newState.records[0]);

      const rows = _(state.rows).map(row => {
        let obj = null;
        if (_.indexOf(keys, row.id) > -1) {
          obj = row;
        }

        return obj;
      })
      .compact()
      .value();

      const cols = _(state.cols).map(col => {
        let obj = null;
        if (_.indexOf(keys, col.id) > -1) {
          obj = col;
        }

        return obj;
      })
      .compact()
      .value();

      const measures = _(state.measures).map(measure => {
        let obj = null;
        if (_.indexOf(keys, measure.key) > -1) {
          obj = measure;
        }

        return obj;
      })
      .compact()
      .value();

      const pivotTableData = populate(state, { rows, cols, measures, records });

      return Object.assign({}, state, newState, { rows, cols, measures, pivotTableData });
    }

    // row
    case TYPES.ADD_ROW: {
      const rows = state.rows.concat([action.data]);
      const pivotTableData = populate(state, { rows });

      return Object.assign({}, state, { rows, pivotTableData });
    }
    case TYPES.MODIFY_ROW: {
      const index = _.findIndex(state.rows, (row) => row.id === action.data.id);
      const rows = Object.assign([], state.rows);

      rows.splice(index, 1, action.data);
      const pivotTableData = populate(state, { rows });

      return Object.assign({}, state, { rows, pivotTableData });
    }
    case TYPES.REMOVE_ROW: {
      const index = _.findIndex(state.rows, (row) => row.id === action.id);
      const rows = Object.assign([], state.rows);

      rows.splice(index, 1);
      const cols = state.cols.map(col => {
        const sort = Object.assign({}, col.sort);
        sort.key.splice(index, sort.key.length);
        return Object.assign({}, col, { sort });
      });

      const pivotTableData = populate(state, { rows, cols });

      return Object.assign({}, state, { rows, pivotTableData });
    }
    case TYPES.REPLACE_ROW: {
      const rows = Object.assign([], state.rows);

      rows.splice(action.to, 0, rows.splice(action.from, 1)[0]);
      const pivotTableData = populate(state, { rows });

      return Object.assign({}, state, { rows, pivotTableData });
    }

    // col
    case TYPES.ADD_COL: {
      const cols = state.cols.concat([action.data]);
      const pivotTableData = populate(state, { cols });

      return Object.assign({}, state, { cols, pivotTableData });
    }
    case TYPES.MODIFY_COL: {
      const index = _.findIndex(state.cols, (col) => col.id === action.data.id);
      const cols = Object.assign([], state.cols);

      cols.splice(index, 1, action.data);
      const pivotTableData = populate(state, { cols });

      return Object.assign({}, state, { cols, pivotTableData });
    }
    case TYPES.REMOVE_COL: {
      const index = _.findIndex(state.cols, (col) => col.id === action.id);
      const cols = Object.assign([], state.cols);

      cols.splice(index, 1);
      const rows = state.rows.map(row => {
        const sort = Object.assign({}, row.sort);
        sort.key.splice(index, sort.key.length);
        return Object.assign({}, row, { sort });
      });

      const pivotTableData = populate(state, { rows, cols });

      return Object.assign({}, state, { rows, cols, pivotTableData });
    }
    case TYPES.REPLACE_COL: {
      const cols = Object.assign([], state.cols);

      cols.splice(action.to, 0, cols.splice(action.from, 1)[0]);
      const pivotTableData = populate(state, { cols });

      return Object.assign({}, state, { cols, pivotTableData });
    }

    // measure
    case TYPES.ADD_MEASURE: {
      Object.assign(action.data, { id: guid() });
      const measures = state.measures.concat([action.data]);
      const pivotTableData = populate(state, { measures });

      return Object.assign({}, state, { measures, pivotTableData });
    }
    case TYPES.MODIFY_MEASURE: {
      const index = _.findIndex(state.measures, (measure) => measure.id === action.data.id);
      const measures = Object.assign([], state.measures);

      measures.splice(index, 1, action.data);
      const pivotTableData = populate(state, { measures });

      return Object.assign({}, state, { measures, pivotTableData });
    }
    case TYPES.REMOVE_MEASURE: {
      const index = _.findIndex(state.measures, (measure) => measure.id === action.id);
      const measures = Object.assign([], state.measures);

      measures.splice(index, 1);
      const pivotTableData = populate(state, { measures });

      return Object.assign({}, state, { measures, pivotTableData });
    }
    case TYPES.REPLACE_MEASURE: {
      const measures = Object.assign([], state.measures);

      measures.splice(action.to, 0, measures.splice(action.from, 1)[0]);
      const pivotTableData = populate(state, { measures });

      return Object.assign({}, state, { measures, pivotTableData });
    }

    case TYPES.REPLACE_ROWS_WITH_COLS: {
      const rows = Object.assign([], state.cols);
      const cols = Object.assign([], state.rows);

      const pivotTableData = populate(state, { rows, cols });

      return Object.assign({}, state, { rows, cols, pivotTableData });
    }

    default:
      return state;
  }
};

export default pivot;
