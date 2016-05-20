import React, { Component, PropTypes } from 'react';
import SortKeySelect from './SortKeySelect';
import _ from 'lodash';

class ColElement extends Component {
  constructor(props) {
    super(props);

    this.sortOrders = [
      { label: 'ascending', value: true },
      { label: 'decending', value: false },
    ];

    this.state = { id: props.data.id };

    this.modifyCol = this.modifyCol.bind(this);
    this.removeCol = this.removeCol.bind(this);
    this.updateSortKey = this.updateSortKey.bind(this)
  }

  modifyCol() {
    const type = this.refs.type.value === 'self' ? 'self' : 'measure';
    const ascending = this.refs.sortOrder.value === 'true';
    const measureIndex = type === 'measure'
      ? _.findIndex(this.props.pivot.measures, measure => measure.id === this.refs.type.value)
      : null;

    const newData = {
      id: this.state.id,
      sort: {
        type,
        key: this.props.data.sort.key,
        measureIndex,
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
      <div className="element-content-area sort-key-area">
        <span className="aux-label">sort key</span>
        <SortKeySelect
          pivot={pivot}
          direction="row"
          data={data.sort.key || []}
          action={this.updateSortKey}
        />
      </div>
      : null;
  }

  render() {
    const { data } = this.props;

    const typeDefaultValue = data.sort.type === 'self'
      ? 'self'
      : this.props.pivot.measures[data.sort.measureIndex].id;

    return (
      <div className="pivot-setting-el-container" data-value={data.id}>
        <label className="key-label" ref="id">{data.id}</label>
        <div className="element-content-block">
          <div className="element-content-area">
            <span className="aux-label">sort by</span>
            <select
              className="sort-type"
              ref="type"
              defaultValue={typeDefaultValue}
              onChange={this.modifyCol}
            >
              {this.renderTypeOptions()}
            </select>
            <select ref="sortOrder" defaultValue={data.sort.ascending} onChange={this.modifyCol}>
              {this.renderSortOrders()}
            </select>
          </div>
          {this.renderSortKeySelect()}
        </div>
        <div>
          <button value={data.id} onClick={this.removeCol}>X</button>
        </div>
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
