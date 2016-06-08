import React, { Component, PropTypes } from 'react';
import CSSModles from 'react-css-modules';
import { Card } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import _ from 'lodash';
import SortKeySelect from './SortKeySelect';
import style from '../styles/base.scss';

class RowElement extends Component {
  constructor(props) {
    super(props);

    this.sortOrders = [
      { label: 'ascending', value: true },
      { label: 'decending', value: false },
    ];

    this.componentData = {
      id: props.data.id,
      type: 'self',
      ascending: true,
      meausreIndex: null,
    };

    this.modifyType = this.modifyType.bind(this);
    this.modifyAscedning = this.modifyAscedning.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.updateSortKey = this.updateSortKey.bind(this);
  }

  modifyType(event, index, id) {
    const type = id === 'self' ? 'self' : 'measure';
    const measureIndex = type === 'measure'
      ? _.findIndex(this.props.pivot.measures, measure => measure.id === id)
      : null;

    Object.assign(this.componentData, { type, measureIndex });
    this.modifyRow();
  }

  modifyAscedning(event, index, bool) {
    const ascending = bool === true;

    Object.assign(this.componentData, { ascending });
    this.modifyRow();
  }

  modifyRow() {
    const { type, ascending, measureIndex } = this.componentData;

    const newData = {
      id: this.componentData.id,
      sort: {
        type,
        key: this.props.data.sort.key,
        measureIndex,
        ascending,
      },
    };

    const data = Object.assign({}, this.props.data, newData);
    this.props.actions.modifyRow(data);
  }

  removeRow(event) {
    const id = event.currentTarget.value;
    this.props.actions.removeRow(id);
  }

  updateSortKey(keyToUpdate) {
    const key = Object.assign([], keyToUpdate);
    if (key.length > 0 && key[key.length - 1] === 'Total') {
      key.pop();
    }

    const data = Object.assign({}, this.props.data);
    Object.assign(data.sort, { key });
    this.props.actions.modifyRow(data);
  }

  renderSortOrderOptions() {
    return this.sortOrders.map(sortOrder =>
      <MenuItem key={sortOrder.value} value={sortOrder.value} primaryText={sortOrder.label} />
    );
  }

  renderTypeOptions() {
    const options = [<MenuItem key="self" value="self" primaryText="Self" />];

    const measures = this.props.pivot.measures;
    measures.forEach((measure, index) =>
      options.push(
        <MenuItem
          key={measure.id}
          value={measure.id}
          data-index={index}
          primaryText={measure.name}
        />
      )
    );

    return options;
  }

  renderSortKeySelect() {
    const { pivot, data } = this.props;

    return this.componentData.type !== 'self'
      ?
      <div styleName="sort-key-area">
        <SortKeySelect
          pivot={pivot}
          direction="col"
          data={data.sort.key || []}
          action={this.updateSortKey}
        />
      </div>
      : null;
  }

  render() {
    const { data } = this.props;

    const typeDefaultValue = this.componentData.type === 'self'
      ? 'self'
      : this.props.pivot.measures[this.componentData.measureIndex].id;

    return (
      <Card styleName="dimension-element-container" data-value={data.id}>
        <div styleName="pivot-setting-el-container">
          <label styleName="key-label" ref="id">{data.id}</label>
          <div styleName="element-content-block">
            <div styleName="element-content-area">
              <SelectField
                ref="sortOrder"
                maxHeight={300}
                value={this.componentData.ascending}
                floatingLabelText="Sort order"
                onChange={this.modifyAscedning}
              >
                {this.renderSortOrderOptions()}
              </SelectField>
              <SelectField
                ref="type"
                maxHeight={300}
                value={typeDefaultValue}
                floatingLabelText="Sort by"
                onChange={this.modifyType}
              >
                {this.renderTypeOptions()}
              </SelectField>
            </div>
            {this.renderSortKeySelect()}
          </div>
          <div>
            <IconButton
              value={data.id}
              tooltip="delete row"
              onClick={this.removeRow}
            >
              <ActionDelete />
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

RowElement.propTypes = {
  data: PropTypes.object.isRequired,
  pivot: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default CSSModles(RowElement, style);
