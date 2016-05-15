import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

class SortKeySelect extends Component {
  constructor(props) {
    super(props);

    this.changeKey = this.changeKey.bind(this);
  }

  changeKey(event) {
    const key = event.target.value;
    const depth = parseInt(event.target.getAttribute('data-depth'), 10);
    const data = Object.assign([], this.props.data);
    const removeCount = data.length - depth;

    data.splice(depth, removeCount, key);
    this.props.action(data);
  }

  renderKey(keyObject, key) {
    let options = [];
    if (keyObject.children && keyObject.children.length > 0) {
      options = keyObject.children.map(obj =>
        <option key={obj.key} value={obj.key}>{obj.key}</option>
      );
    }

    return (
      <select
        key={keyObject.key}
        ref={keyObject.depth}
        data-depth={keyObject.depth}
        value={key}
        onChange={this.changeKey}
      >
        <option key="total" value="Total">Total</option>
        {options}
      </select>
    );
  }

  renderNestedKeys(keys) {
    let nestedKeys = { children: [] };

    if (this.props.pivot.pivotTableData) {
      if (this.props.direction === 'col') {
        nestedKeys = this.props.pivot.pivotTableData.getNestedColKeys();
      } else {
        nestedKeys = this.props.pivot.pivotTableData.getNestedRowKeys();
      }
    }

    const keySelects = [];
    let keyList = nestedKeys;

    keys.forEach((key) => {
      keySelects.push(this.renderKey(keyList, key));
      keyList = _.find(keyList.children, obj => obj.key === key);
    });

    return keySelects;
  }

  render() {
    const keys = Object.assign([], this.props.data);
    const attrs = this.props.direction === 'col'
      ? this.props.pivot.cols
      : this.props.pivot.rows;
    if (keys.length < attrs.length) {
      keys.push('Total');
    }

    return (
      <span>
        {this.renderNestedKeys(keys)}
      </span>
    );
  }
}

SortKeySelect.propTypes = {
  pivot: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  direction: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

SortKeySelect.initialState = {
  keys: [],
};

export default SortKeySelect;
