import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

class SortKeySelect extends Component {
  constructor(prop) {
    super(prop);

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
      options = keyObject.children.map(obj => <option key={obj.key}>{obj.key}</option>);
    }

    return (
      <select
        key={keyObject.key}
        ref={keyObject.depth}
        data-depth={keyObject.depth}
        defaultValue={key}
        onChange={this.changeKey}
      >
        <option key="total">Total</option>
        {options}
      </select>
    );
  }

  renderNestedKeys(keys) {
    const nestedKeys = this.props.pivot.pivotTableData
      ? this.props.pivot.pivotTableData.getNestedColKeys()
      : { children: [] };

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
    if (keys.length < this.props.pivot.cols.length) {
      keys.push('Total');
    }

    return (
      <div>
        {this.renderNestedKeys(keys)}
      </div>
    );
  }
}

SortKeySelect.propTypes = {
  pivot: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired,
};

SortKeySelect.initialState = {
  keys: [],
};

export default SortKeySelect;
