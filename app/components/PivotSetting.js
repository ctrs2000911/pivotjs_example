import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import RowElement from './RowElement';
import ColElement from './ColElement';
import MeasureElement from './MeasureElement';
import SortableList from './SortableList';

class PivotSetting extends Component {
  constructor(props) {
    super(props);

    this.addRow = this.addRow.bind(this);
    this.addCol = this.addCol.bind(this);
    this.addMeasure = this.addMeasure.bind(this);

    this.renderRowElement = this.renderRowElement.bind(this);
    this.renderColElement = this.renderColElement.bind(this);
    this.renderMeasureElement = this.renderMeasureElement.bind(this);

    this.measueItemPlaceChangedHandler = this.measueItemPlaceChangedHandler.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this)
      .addEventListener('itemPlaceChanged', this.measueItemPlaceChangedHandler);
  }

  componentWillUnmount() {
    this.removeEventListener('itemPlaceChanged', this.measueItemPlaceChangedHandler);
  }

  measueItemPlaceChangedHandler(e) {
    const { from, to } = e.detail;

    switch (e.target.getAttribute('data-name')) {
      case 'measureList':
        this.props.actions.replaceMeasure(from, to);
        break;
      case 'rowList':
        this.props.actions.replaceRow(from, to);
        break;
      case 'colList':
        this.props.actions.replaceCol(from, to);
        break;
      default:
        return;
    }
  }

  addRow() {
    const id = this.refs.rowColumns.value;
    const sort = {
      type: 'self',
      key: [],
      position: null,
      ascending: true,
    };

    const row = { id, sort };

    this.props.actions.addRow(row);
  }

  addCol() {
    const id = this.refs.colColumns.value;
    const sort = {
      type: 'self',
      key: [],
      position: null,
      ascending: true,
    };

    const col = { id, sort };

    this.props.actions.addCol(col);
  }

  addMeasure() {
    const key = this.refs.measureColumns.value;
    const aggregation = 'sum';

    const measure = {
      name: `${key}:${aggregation}`,
      key: `${key}`,
      format: 'int',
      aggregation: `${aggregation}`,
    };

    this.props.actions.addMeasure(measure);
  }

  renderRowElement(row) {
    const { pivot, actions } = this.props;
    return <RowElement key={row.id} data={row} pivot={pivot} actions={actions} />;
  }

  renderColElement(col) {
    const { pivot, actions } = this.props;
    return <ColElement key={col.id} data={col} pivot={pivot} actions={actions} />;
  }

  renderMeasureElement(measure) {
    const { actions } = this.props;
    return <MeasureElement key={measure.id} data={measure} actions={actions} />;
  }

  render() {
    const pivot = this.props.pivot;

    let recordColumns = _.keys(pivot.records[0]);
    const rowColumns = pivot.rows.map((row) => row.id);
    const colColumns = pivot.cols.map((col) => col.id);
    const usedColumns = rowColumns.concat(colColumns);
    recordColumns = _.without(recordColumns, ...usedColumns);

    return (
      <div>
        <div>
          <label>Measures</label>
          <select ref="measureColumns" defaultValue={recordColumns[0]}>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <button onClick={this.addMeasure}>Add measure</button>
          <SortableList
            name="measureList"
            data={pivot.measures}
            listElementRenderer={this.renderMeasureElement}
          />
        </div>

        <div>
          <label>Rows</label>
          <select ref="rowColumns" defaultValue={recordColumns[0]}>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <button onClick={this.addRow}>Add col</button>
          <SortableList
            name="rowList"
            data={pivot.rows}
            listElementRenderer={this.renderRowElement}
          />
        </div>

        <button onClick={this.props.actions.replaceRowsWithCols}>Replace Rows with Cols</button>
        <div>
          <label>Cols</label>
          <select ref="colColumns" defaultValue={recordColumns[0]}>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <button onClick={this.addCol}>Add col</button>
          <SortableList
            name="colList"
            data={pivot.cols}
            listElementRenderer={this.renderColElement}
          />
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
