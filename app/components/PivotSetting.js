import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import RowElement from './RowElement';
import ColElement from './ColElement';
import MeasureElement from './MeasureElement';

class PivotSetting extends Component {
  constructor(prop) {
    super(prop);

    this.addRow = this.addRow.bind(this);
    this.addCol = this.addCol.bind(this);
    this.addMeasure = this.addMeasure.bind(this);
  }

  addRow() {
    const id = this.refs.row_columns.value;
    const sort = {
      type: 'self',
      key: [],
      position: null,
      kind: 'row',
      ascending: true,
    };

    const row = { id, sort };

    this.props.actions.addRow(row);
  }

  addCol() {
    const id = this.refs.col_columns.value;
    const sort = {
      type: 'self',
      key: [],
      position: null,
      kind: 'col',
      ascending: true,
    };

    const col = { id, sort };

    this.props.actions.addCol(col);
  }

  addMeasure() {
    const key = this.refs.measure_columns.value;
    const aggregation = 'sum';

    const measure = {
      name: `${key}:${aggregation}`,
      key: `${key}`,
      format: 'int',
      aggregation: `${aggregation}`,
    };

    this.props.actions.addMeasure(measure);
  }

  renderRows() {
    const { pivot, actions } = this.props;

    return pivot.rows.map(row =>
      <RowElement key={row.id} data={row} pivot={pivot} actions={actions} />
    );
  }

  renderCols() {
    const { pivot, actions } = this.props;

    return pivot.cols.map(col =>
      <ColElement key={col.id} data={col} pivot={pivot} actions={actions} />
    );
  }

  renderMeasures() {
    const { pivot, actions } = this.props;

    return pivot.measures.map(measure =>
      <MeasureElement key={measure.id} data={measure} actions={actions} />
    );
  }

  render() {
    const recordColumns = _.keys(this.props.pivot.records[0]);

    return (
      <div>
        <div>
          <label>Measures</label>
          <select ref="measure_columns" defaultValue={recordColumns[0]}>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <button onClick={this.addMeasure}>Add measure</button>
          <ul>
            {this.renderMeasures()}
          </ul>
        </div>

        <div>
          <label>Rows</label>
          <select ref="row_columns" defaultValue={recordColumns[0]}>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <button onClick={this.addRow}>Add col</button>
          <ul>
            {this.renderRows()}
          </ul>
        </div>

        <div>
          <label>Cols</label>
          <select ref="col_columns" defaultValue={recordColumns[0]}>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <button onClick={this.addCol}>Add col</button>
          <ul>
            {this.renderCols()}
          </ul>
        </div>
      </div>
    );
  }
}

PivotSetting.propTypes = {
  pivot: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default PivotSetting;
