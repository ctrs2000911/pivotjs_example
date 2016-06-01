import React, { Component, PropTypes } from 'react';
import CSSModles from 'react-css-modules';
import style from '../styles/base.scss';

class MeasureElement extends Component {
  constructor(props) {
    super(props);

    this.formats = [
      'int',
      'float',
      'percent',
    ];

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

    this.state = { key: props.data.key };

    this.modifyMeasure = this.modifyMeasure.bind(this);
    this.removeMeasure = this.removeMeasure.bind(this);
  }

  modifyMeasure() {
    const newData = {
      name: this.refs.name.value,
      key: this.state.key,
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


  renderFormatOptions() {
    return this.formats.map((format) => <option key={format} value={format}>{format}</option>);
  }

  renderAggregationOptions() {
    return this.aggregations.map((agg) => <option key={agg} value={agg}>{agg}</option>);
  }

  render() {
    const data = this.props.data;

    return (
      <div styleName="pivot-setting-el-container" data-value={data.id}>
        <label styleName="key-label" ref="key">{data.key}</label>
        <div styleName="element-content-block">
          <span styleName="aux-label">name</span>
          <input
            styleName="measure-name"
            ref="name"
            defaultValue={data.name}
            onBlur={this.modifyMeasure}
          />
          <select ref="format" value={data.format} onChange={this.modifyMeasure}>
            {this.renderFormatOptions()}
          </select>
          <select ref="aggregation" value={data.aggregation} onChange={this.modifyMeasure}>
            {this.renderAggregationOptions()}
          </select>
        </div>
        <div>
          <button value={data.id} onClick={this.removeMeasure}>X</button>
        </div>
      </div>
    );
  }
}

MeasureElement.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default CSSModles(MeasureElement, style);
