import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CSSModles from 'react-css-modules';
import _ from 'lodash';
import RowElement from './RowElement';
import ColElement from './ColElement';
import MeasureElement from './MeasureElement';
import SortableList from './SortableList';
import style from '../styles/base.scss';

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

    this.style = {
      padding: 16,
      width: 412,
      maxHeight: 500,
      overflowY: 'scroll',
    };
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

  addRow(event, index, id) {
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

  addCol(event, index, id) {
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

  addMeasure(event, index, key) {
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
      <Card style={this.style}>
        <div styleName="pivot-setting-block">
          <DropDownMenu maxHeight={300} value="add" onChange={this.addMeasure}>
            <MenuItem key="add" value="add" primaryText="Add Measure ..." />
            {recordColumns.map(column =>
              <MenuItem key={column} value={column} primaryText={column} />
            )}
          </DropDownMenu>
          <div styleName="pivot-setting-el-area">
            <SortableList
              name="measureList"
              data={pivot.measures}
              listElementRenderer={this.renderMeasureElement}
            />
          </div>
        </div>

        <div styleName="pivot-setting-block">
          <DropDownMenu maxHeight={300} value="add" onChange={this.addRow}>
            <MenuItem key="add" value="add" primaryText="Add Row ..." />
            {recordColumns.map(column =>
              <MenuItem key={column} value={column} primaryText={column} />
            )}
          </DropDownMenu>
          <div styleName="pivot-setting-el-area">
            <SortableList
              name="rowList"
              data={pivot.rows}
              listElementRenderer={this.renderRowElement}
            />
          </div>
        </div>

        <div styleName="replace-rows-cols-button-block">
          <RaisedButton label="Replace" onClick={this.props.actions.replaceRowsWithCols} />
        </div>

        <div styleName="pivot-setting-block">
          <DropDownMenu maxHeight={300} value="add" onChange={this.addCol}>
            <MenuItem key="add" value="add" primaryText="Add Col..." />
            {recordColumns.map(column =>
              <MenuItem key={column} value={column} primaryText={column} />
            )}
          </DropDownMenu>
          <div styleName="pivot-setting-el-area">
            <SortableList
              name="colList"
              data={pivot.cols}
              listElementRenderer={this.renderColElement}
            />
          </div>
        </div>
      </Card>
    );
  }
}

PivotSetting.propTypes = {
  pivot: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default CSSModles(PivotSetting, style);
