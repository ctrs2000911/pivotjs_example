import React, { Component, PropTypes } from 'react';
import CSSModles from 'react-css-modules';
import { Card } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
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

    this.componentData = {
      key: props.data.key,
      name: props.data.name,
      format: props.data.format,
      aggregation: props.data.aggregation,
    };

    this.modifyName = this.modifyName.bind(this);
    this.modifyFormat = this.modifyFormat.bind(this);
    this.modifyAggregation = this.modifyAggregation.bind(this);
    this.removeMeasure = this.removeMeasure.bind(this);
  }

  modifyName() {
    Object.assign(this.componentData, { name: this.refs.name.getValue() });
    this.modifyMeasure();
  }

  modifyFormat(event, index, format) {
    Object.assign(this.componentData, { format });
    this.modifyMeasure();
  }

  modifyAggregation(event, index, aggregation) {
    Object.assign(this.componentData, { aggregation });
    this.modifyMeasure();
  }

  modifyMeasure() {
    const data = Object.assign({}, this.props.data, this.componentData);

    this.props.actions.modifyMeasure(data);
  }

  removeMeasure(event) {
    const id = event.currentTarget.value;
    this.props.actions.removeMeasure(id);
  }


  renderFormatOptions() {
    return this.formats.map(format =>
      <MenuItem key={format} value={format} primaryText={format} />
    );
  }

  renderAggregationOptions() {
    return this.aggregations.map(agg =>
      <MenuItem key={agg} value={agg} primaryText={agg} />
    );
  }

  render() {
    const data = this.props.data;

    return (
      <Card styleName="dimension-element-container" data-value={data.id}>
        <div styleName="pivot-setting-el-container">
          <label styleName="key-label" ref="key">{data.key}</label>
          <div styleName="element-content-block">
            <TextField
              ref="name"
              hintText="Name"
              defaultValue={this.componentData.name}
              floatingLabelText="Name"
              onBlur={this.modifyName}
            />
            <SelectField
              ref="format"
              value={this.componentData.format}
              floatingLabelText="Format"
              onChange={this.modifyFormat}
            >
              {this.renderFormatOptions()}
            </SelectField>
            <SelectField
              ref="aggregation"
              value={this.componentData.aggregation}
              floatingLabelText="aggregation"
              onChange={this.modifyAggregation}
            >
              {this.renderAggregationOptions()}
            </SelectField>
          </div>
          <div>
            <IconButton
              value={data.id}
              tooltip="delete measure"
              onClick={this.removeMeasure}
            >
              <ActionDelete />
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

MeasureElement.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default CSSModles(MeasureElement, style);
