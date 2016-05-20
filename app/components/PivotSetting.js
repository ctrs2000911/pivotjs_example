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

    if (id === 'add') {
      return;
    }

    const sort = {
      type: 'self',
      key: [],
      measureIndex: null,
      ascending: true,
    };

    const row = { id, sort };

    this.props.actions.addRow(row);
  }

  addCol() {
    const id = this.refs.colColumns.value;

    if (id === 'add') {
      return;
    }

    const sort = {
      type: 'self',
      key: [],
      measureIndex: null,
      ascending: true,
    };

    const col = { id, sort };

    this.props.actions.addCol(col);
  }

  addMeasure() {
    const key = this.refs.measureColumns.value;

    if (key === 'add') {
      return;
    }

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
      <div className="pivot-setting-container">
        <div className="pivot-setting-block">
          <label className="pivot-setting-label">Measures:</label>
          <select ref="measureColumns" value="add" onChange={this.addMeasure}>
            <option key="add" value="add">add...</option>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <div className="pivot-setting-el-area">
            <SortableList
              name="measureList"
              data={pivot.measures}
              listElementRenderer={this.renderMeasureElement}
            />
          </div>
        </div>

        <div className="pivot-setting-block">
          <label className="pivot-setting-label">Rows:</label>
          <select ref="rowColumns" value="add" onChange={this.addRow}>
            <option key="add" value="add">add...</option>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <div className="pivot-setting-el-area">
            <SortableList
              name="rowList"
              data={pivot.rows}
              listElementRenderer={this.renderRowElement}
            />
          </div>
        </div>

        <div className="pivot-setting-block replace-rows-cols-button-block">
          <button onClick={this.props.actions.replaceRowsWithCols}>Replace Rows with Cols</button>
        </div>

        <div className="pivot-setting-block">
          <label className="pivot-setting-label">Cols:</label>
          <select ref="colColumns" value="add" onChange={this.addCol}>
            <option key="add" value="add">add...</option>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <div className="pivot-setting-el-area">
            <SortableList
              name="colList"
              data={pivot.cols}
              listElementRenderer={this.renderColElement}
            />
          </div>
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
