import React, { Component, PropTypes } from 'react';

class MeasureElement extends Component {
  constructor(prop) {
    super(prop);

    this.aggregations = [
      'sum',
      'count',
      'counta',
      'unique',
      'average',
      'median',
      'mode',
      'max',
      'min',
    ];

    this.modifyMeasure = this.modifyMeasure.bind(this);
    this.removeMeasure = this.removeMeasure.bind(this);
  }

  modifyMeasure() {
    const newData = {
      name: this.refs.name.value,
      key: this.refs.key.value,
      format: this.refs.format.value,
      aggregation: this.refs.aggregation.value,
    };

    const data = Object.assign({}, this.props.data, newData);
    this.props.actions.modifyMeasure(data);
  }

  removeMeasure(event) {
    const id = event.target.value;
    this.props.actions.removeMeasure(id);
  }

  renderAggregationOptions() {
    return this.aggregations.map((agg) => <option key={agg} value={agg}>{agg}</option>);
  }
  render() {
    const data = this.props.data;

    return (
      <li data-value={data.id}>
        <input ref="name" defaultValue={data.name} />
        <input ref="key" defaultValue={data.key} />
        <input ref="format" defaultValue={data.format} />
        <select ref="aggregation" defaultValue={data.aggregation}>
          {this.renderAggregationOptions()}
        </select>
        <button onClick={this.modifyMeasure} value={data.id}>apply change</button>
        <button onClick={this.removeMeasure} value={data.id}>remove</button>
      </li>
    );
  }
}

MeasureElement.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default MeasureElement;
