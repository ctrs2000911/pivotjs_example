import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'lodash';
import TableData from './TableData';

class Main extends Component {
  componentDidMount() {
    console.log('componentDidMount')
    this.updateTableDisplay();
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, prevState);
    this.updateTableDisplay(...arguments);
  }

  updateTableDisplay(prevProps, prevState) {
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
      .classed({
        'argus-table': true,
        'pvt-table': true,
        'table-bordered': true,
      });
    const thead = table.append('thead');
    const tbody = table.append('tbody');

    // thead
    thead.selectAll('tr')
      .data(headerRows)
      .enter()
        .append('tr')
        .classed({
          'pivot-row': true,
        })
        .selectAll('tr')
        .data(d => d.caption.concat(d.colKey))
        .enter()
          .append('th')
          .attr({
            class: d => d.style,
            colspan: d => d.colspan,
            rowspan: d => d.rowspan,
          })
          .text(d => d.key);

    // tbody
    const tbodyTr = tbody.selectAll('tr')
      .data(bodyRows)
      .enter()
        .append('tr')
        .classed({ 'pivot-row': true });

    tbodyTr.selectAll('tr')
      .data(d => d.rowKey)
      .enter()
        .append('th')
        .attr({
          class: d => d.style,
          rowspan: d => d.rowspan,
          colspan: d => (d.colspan === 1 ? null : d.colspan),
        })
        .text(d => d.key);

    tbodyTr.selectAll('tr td')
      .data(d => _.flatten(d.values))
      .enter()
        .append('td')
        .classed({ 'pivot-val': true })
        .attr('data-value', d => (d ? d.value : '-'))
        .text(d => (d ? d.value : '-'));
  }

  render() {
    console.log('render');
    return <div ref="pivotTable" />;
  }
}

Main.propTypes = {
  pivot: PropTypes.object.isRequired,
  chartOptions: PropTypes.object.isRequired,
};

export default Main;
