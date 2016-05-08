import * as CHART_OPTIONS_TYPES from '../constants/ChartOptionTypes';
import * as PIVOT_TYPES from '../constants/PivotTypes';

// chartOptions
export function changeShowSubTotal() {
  return { type: CHART_OPTIONS_TYPES.CHANGE_SHOW_SUB_TOTAL };
}

export function changeShowTotal() {
  return { type: CHART_OPTIONS_TYPES.CHANGE_SHOW_TOTAL };
}


// pivot
export function populate() {
  return { type: PIVOT_TYPES.POPULATE };
}

export function changeRecords(recordString = '[]') {
  return { type: PIVOT_TYPES.CHANGE_RECORDS, recordString };
}

export function addRow(data) {
  return { type: PIVOT_TYPES.ADD_ROW, data };
}

export function modifyRow(data) {
  return { type: PIVOT_TYPES.MODIFY_ROW, data };
}

export function removeRow(id) {
  return { type: PIVOT_TYPES.REMOVE_ROW, id };
}


export function addCol(data) {
  return { type: PIVOT_TYPES.ADD_COL, data };
}

export function modifyCol(data) {
  return { type: PIVOT_TYPES.MODIFY_COL, data };
}

export function removeCol(id) {
  return { type: PIVOT_TYPES.REMOVE_COL, id };
}


export function addMeasure(data) {
  return { type: PIVOT_TYPES.ADD_MEASURE, data };
}

export function modifyMeasure(data) {
  return { type: PIVOT_TYPES.MODIFY_MEASURE, data };
}

export function removeMeasure(id) {
  return { type: PIVOT_TYPES.REMOVE_MEASURE, id };
}
