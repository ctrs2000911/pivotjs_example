import React, { Component, PropTypes } from 'react';
import CSSModles from 'react-css-modules';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import style from '../styles/base.scss';

class SortKeySelect extends Component {
  constructor(props) {
    super(props);

    this.changeKey = this.changeKey.bind(this);
  }

  changeKey(event, index, id) {
    const key = id;
    const depth = event.currentTarget.getAttribute('data-depth');
    const data = Object.assign([], this.props.data);
    const removeCount = data.length - depth;

    data.splice(depth, removeCount, key);
    this.props.action(data);
  }

  renderKey(keyObject, key) {
    let options = [];
    if (keyObject.children && keyObject.children.length > 0) {
      options = keyObject.children.map(obj =>
        <MenuItem
          key={obj.key}
          value={obj.key}
          data-depth={keyObject.depth}
          primaryText={obj.key}
        />
      );
    }

    const floatingLabelText = keyObject.depth === 0 ? 'Sort key' : null;

    return (
      <SelectField
        key={keyObject.key}
        ref={keyObject.depth}
        data-depth={keyObject.depth}
        value={key}
        floatingLabelText={floatingLabelText}
        onChange={this.changeKey}
      >
        <MenuItem key="total" value="Total" data-depth={keyObject.depth} primaryText="Total" />
        {options}
      </SelectField>
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

export default CSSModles(SortKeySelect, style);
