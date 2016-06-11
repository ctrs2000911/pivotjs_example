import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'material-ui/Card';
import d3 from 'd3';
import _ from 'lodash';
import TableData from '../logic/TableData';
import style from '../styles/pivot_table.scss';

class PivotTable extends Component {
  constructor(props) {
    super(props);

    this.containerStyle = {
      overflow: 'auto',
      padding: '16px',
      maxHeight: 1000,
      width: 'calc(100% - 412px)',
    };
  }

  componentDidMount() {
    this.updateTableDisplay();
  }

  componentDidUpdate(...args) {
    this.updateTableDisplay.apply(this, args);
  }

  updateTableDisplay(prevProps) {
    const pivotTableDataIsNotChanged = prevProps
      && prevProps.pivot.pivotTableData === this.props.pivot.pivotTableData;
    const chartOptionsIsNotChanged = prevProps
      && prevProps.chartOptions === this.props.chartOptions;

    if (pivotTableDataIsNotChanged && chartOptionsIsNotChanged) {
      return;
    }

    const pivotTable
      = new TableData(this.props.pivot.pivotTableData, this.props.chartOptions).create();
    if (!pivotTable) {
      return;
    }

    const { headerRows, bodyRows } = pivotTable;

    // table creation
    d3.select(ReactDOM.findDOMNode(this.refs.pivotTable))
      .selectAll('*')
      .remove();

    const table = d3.select(ReactDOM.findDOMNode(this.refs.pivotTable))
      .append('table')
      .attr({
        class: `${style['argus-table']} ${style['pivot-table']} ${style['table-bordered']}`,
      });
    const thead = table.append('thead');
    const tbody = table.append('tbody');

    // thead
    thead.selectAll('tr')
      .data(headerRows)
      .enter()
        .append('tr')
        .attr({
          class: `${style['pivot-col-label']}`,
        })
        .selectAll('tr')
        .data(d => d.caption.concat(d.colKey))
        .enter()
          .append('th')
          .attr({
            class: d => style[d.style],
            colspan: d => d.colspan,
            rowspan: d => d.rowspan,
          })
          .text(d => d.key);

    // tbody
    const tbodyTr = tbody.selectAll('tr')
      .data(bodyRows)
      .enter()
        .append('tr')
        .attr({
          class: `${style['pivot-row-label']}`,
        });

    tbodyTr.selectAll('tr')
      .data(d => d.rowKey)
      .enter()
        .append('th')
        .attr({
          class: d => style[d.style],
          rowspan: d => d.rowspan,
          colspan: d => (d.colspan === 1 ? null : d.colspan),
        })
        .text(d => d.key);

    tbodyTr.selectAll('tr td')
      .data(d => _.flatten(d.values))
      .enter()
        .append('td')
        .attr({
          class: `${style['pivot-val']}`,
          'data-value': d => (d ? d.value : '-'),
        })
        .text(d => (d ? d.value : '-'));
  }

  render() {
    return (
      <Card style={this.containerStyle}>
        <div ref="pivotTable" />
      </Card>
    );
  }
}

PivotTable.propTypes = {
  pivot: PropTypes.object.isRequired,
  chartOptions: PropTypes.object.isRequired,
};

export default PivotTable;
