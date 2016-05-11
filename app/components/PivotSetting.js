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
          <SortableList
            name="measureList"
            data={this.props.pivot.measures}
            listElementRenderer={this.renderMeasureElement}
          />
        </div>

        <div>
          <label>Rows</label>
          <select ref="row_columns" defaultValue={recordColumns[0]}>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <button onClick={this.addRow}>Add col</button>
          <SortableList
            name="rowList"
            data={this.props.pivot.rows}
            listElementRenderer={this.renderRowElement}
          />
        </div>

        <div>
          <label>Cols</label>
          <select ref="col_columns" defaultValue={recordColumns[0]}>
            {recordColumns.map(column =>
              <option key={column} value={column}>{column}</option>
            )}
          </select>
          <button onClick={this.addCol}>Add col</button>
          <SortableList
            name="colList"
            data={this.props.pivot.cols}
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
