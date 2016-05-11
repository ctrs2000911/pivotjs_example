import React, { Component, PropTypes } from 'react';

class MeasureElement extends Component {
  constructor(props) {
    super(props);

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
      <div data-value={data.id}>
        <input ref="name" defaultValue={data.name} onBlur={this.modifyMeasure} />
        <input ref="key" defaultValue={data.key} />
        <input ref="format" defaultValue={data.format} onChange={this.modifyMeasure} />
        <select ref="aggregation" defaultValue={data.aggregation} onChange={this.modifyMeasure}>
          {this.renderAggregationOptions()}
        </select>
        <button value={data.id} onClick={this.removeMeasure}>remove</button>
      </div>
    );
  }
}

MeasureElement.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default MeasureElement;
