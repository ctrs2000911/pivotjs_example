import React, { Component, PropTypes } from 'react';
import SortKeySelect from './SortKeySelect';
import _ from 'lodash';

class ColElement extends Component {
  constructor(prop) {
    super(prop);

    this.sortOrders = [
      { label: 'ascending', value: true },
      { label: 'decending', value: false },
    ];

    this.modifyCol = this.modifyCol.bind(this);
    this.removeCol = this.removeCol.bind(this);
    this.updateSortKey = this.updateSortKey.bind(this)
  }

  modifyCol() {
    const type = this.refs.type.value === 'self' ? 'self' : 'measure';
    const ascending = this.refs.sortOrder.value === 'true';
    const position = type === 'measure'
      ? _.findIndex(this.props.pivot.measures, measure => measure.id === this.refs.type.value)
      : null;

    const newData = {
      id: this.refs.id.value,
      sort: {
        type,
        key: this.props.data.sort.key,
        kind: 'col',
        position,
        ascending,
      },
    };

    const data = Object.assign({}, this.props.data, newData);
    this.props.actions.modifyCol(data);
  }

  removeCol(event) {
    const id = event.target.value;
    this.props.actions.removeCol(id);
  }

  updateSortKey(keyToUpdate) {
    const key = Object.assign([], keyToUpdate);
    if (key.length > 0 && key[key.length - 1] === 'Total') {
      key.pop();
    }

    const data = Object.assign({}, this.props.data);
    Object.assign(data.sort, { key });
    this.props.actions.modifyCol(data);
  }

  renderSortOrders() {
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
        direction="row"
        data={data.sort.key || []}
        action={this.updateSortKey}
      />
      : null;
  }

  render() {
    const { data } = this.props;

    return (
      <div key={data.id} data-value={data.id}>
        <input ref="id" value={data.id} />
        <select ref="type" defaultValue={data.sort.type} onChange={this.modifyCol}>
          {this.renderTypeOptions()}
        </select>
        {this.renderSortKeySelect()}
        <select ref="sortOrder" defaultValue={data.sort.ascending} onChange={this.modifyCol}>
          {this.renderSortOrders()}
        </select>
        <button value={data.id} onClick={this.removeCol}>remove</button>
      </div>
    );
  }
}

ColElement.propTypes = {
  data: PropTypes.object.isRequired,
  pivot: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default ColElement;
