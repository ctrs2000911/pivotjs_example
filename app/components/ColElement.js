import React, { Component, PropTypes } from 'react';

class ColElement extends Component {
  constructor(prop) {
    super(prop);

    this.sortOrders = [
      { label: 'ascending', value: true },
      { label: 'decending', value: false },
    ];

    this.modifyCol = this.modifyCol.bind(this);
    this.removeCol = this.removeCol.bind(this);
  }

  modifyCol() {
    const newData = {
      id: this.refs.id.value,
      sort: {
        type: this.refs.type.value,
        ascending: this.refs.sortOrder.value,
      },
    };

    const data = Object.assign({}, this.props.data, newData);
    this.props.actions.modifyCol(data);
  }

  removeCol(event) {
    const id = event.target.value;
    this.props.actions.removeCol(id);
  }

  renderSortOrders() {
    return this.sortOrders.map((sortOrder) =>
      <option key={sortOrder.value} value={sortOrder.value}>{sortOrder.label}</option>
    );
  }

  render() {
    const data = this.props.data;

    return (
      <li key={data.id} data-value={data.id}>
        <input ref="id" value={data.id} />
        <select ref="type" defaultValue={data.sort.type}>
          <option value="self">Self</option>
        </select>
        <select ref="sortOrder" defaultValue={data.sort.ascending}>
          {this.renderSortOrders()}
        </select>
        <button onClick={this.modifyCol} value={data.id}>apply change</button>
        <button onClick={this.removeCol} value={data.id}>remove</button>
      </li>
    );
  }
}

ColElement.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default ColElement;
