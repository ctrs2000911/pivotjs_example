import React, { Component, PropTypes } from 'react';
import SortKeySelect from './SortKeySelect';
import _ from 'lodash';

class RowElement extends Component {
  constructor(props) {
    super(props);

    this.sortOrders = [
      { label: 'ascending', value: true },
      { label: 'decending', value: false },
    ];

    this.modifyRow = this.modifyRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.updateSortKey = this.updateSortKey.bind(this);
  }

  modifyRow() {
    const type = this.refs.type.value === 'self' ? 'self' : 'measure';
    const ascending = this.refs.sortOrder.value === 'true';
    const measureIndex = type === 'measure'
      ? _.findIndex(this.props.pivot.measures, measure => measure.id === this.refs.type.value)
      : null;

    const newData = {
      id: this.refs.id.value,
      sort: {
        type,
        key: this.props.data.sort.key,
        kind: 'row',
        measureIndex,
        ascending,
      },
    };

    const data = Object.assign({}, this.props.data, newData);
    this.props.actions.modifyRow(data);
  }

  removeRow(event) {
    const id = event.target.value;
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

  renderSortOrdersOptions() {
    return this.sortOrders.map(sortOrder =>
      <option key={sortOrder.value} value={sortOrder.value}>{sortOrder.label}</option>
    );
  }

  renderTypeOptions() {
    const options = [<option key="self" value="self">Self</option>];

    const measures = this.props.pivot.measures;
    measures.forEach((measure, index) =>
      options.push(
        <option key={measure.id} value={measure.id} data-index={index}>{measure.name}</option>
      )
    );

    return options;
  }

  renderSortKeySelect() {
    const { pivot, data } = this.props;
    return this.props.data.sort.type !== 'self'
      ?
      <SortKeySelect
        pivot={pivot}
        direction="col"
        data={data.sort.key || []}
        action={this.updateSortKey}
      />
      : null;
  }

  render() {
    const { data } = this.props;

    const typeDefaultValue = data.sort.type === 'self'
      ? 'self'
      : this.props.pivot.measures[data.sort.measureIndex].id;

    return (
      <div key={data.id} data-value={data.id}>
        <input ref="id" value={data.id} />
        <select ref="type" defaultValue={typeDefaultValue} onChange={this.modifyRow}>
          {this.renderTypeOptions()}
        </select>
        {this.renderSortKeySelect()}
        <select ref="sortOrder" defaultValue={data.sort.ascending} onChange={this.modifyRow}>
          {this.renderSortOrdersOptions()}
        </select>
        <button value={data.id} onClick={this.removeRow}>remove</button>
      </div>
    );
  }
}

RowElement.propTypes = {
  data: PropTypes.object.isRequired,
  pivot: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default RowElement;
