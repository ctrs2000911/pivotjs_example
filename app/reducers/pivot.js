import * as TYPES from '../constants/PivotTypes.js';
import _ from 'lodash';
import { Pivot } from 'pivotjs';
import guid from '../utils/utils';

const initialRecordString = `[{ "val1": 100, "cat": "a", "cat2": "a1", "cat3": "x", "date": "2016-01-01", "month": "2016-01", "day": "01" },
{ "val1": 200, "cat": "a", "cat2": "a2", "cat3": "x", "date": "2016-01-01", "month": "2016-01", "day": "01" },
{ "val1": 100, "cat": "a", "cat2": "a2", "cat3": "y", "date": "2016-01-01", "month": "2016-01", "day": "01" },
{ "val1": 200, "cat": "a", "cat2": "a3", "cat3": "y", "date": "2016-01-01", "month": "2016-01", "day": "01" },
{ "val1": 400, "cat": "a", "cat2": "a2", "cat3": "y", "date": "2016-01-02", "month": "2016-01", "day": "02" },
{ "val1": 150, "cat": "a", "cat2": "a1", "cat3": "x", "date": "2016-01-03", "month": "2016-01", "day": "03" },
{ "val1": 300, "cat": "b", "cat2": "b1", "cat3": "x", "date": "2016-01-02", "month": "2016-01", "day": "02" },
{ "val1": 200, "cat": "c", "cat2": "c1", "cat3": "y", "date": "2016-01-03", "month": "2016-01", "day": "03" },
{ "val1": 1000, "cat": "c", "cat2": "c1", "cat3": "x", "date": "2016-01-03", "month": "2016-01", "day": "03" },
{ "val1": 100, "cat": "c", "cat2": "c1", "cat3": "x", "date": "2016-01-03", "month": "2016-01", "day": "03" }]`;

const initialState = {
  recordString: initialRecordString,
  records: JSON.parse(initialRecordString.replace(/\n/g, '')),
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
      const newState = {
        recordString: action.recordString,
        records: JSON.parse(action.recordString.replace(/\n/g, '')),
      };

      return Object.assign({}, state, { newState });
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
    default:
      return state;
  }
};

export default pivot;
