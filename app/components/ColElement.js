import React, { Component, PropTypes } from 'react';
import CSSModles from 'react-css-modules';
import _ from 'lodash';
import SortKeySelect from './SortKeySelect';
import style from '../styles/base.scss';

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
    this.updateSortKey = this.updateSortKey.bind(this);
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
      <div styleName="sort-key-area">
        <span styleName="aux-label">sort key</span>
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
      <div styleName="pivot-setting-el-container" data-value={data.id}>
        <label styleName="key-label" ref="id">{data.id}</label>
        <div styleName="element-content-block">
          <div styleName="element-content-area">
            <span styleName="aux-label">sort by</span>
            <select
              styleName="sort-type"
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

export default CSSModles(ColElement, style);
