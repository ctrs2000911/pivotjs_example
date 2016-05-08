import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RecordsEditor from '../components/RecordsEditor';
import ChartOptions from '../components/ChartOptions';
import PivotSetting from '../components/PivotSetting';
import Main from '../components/Main';
import * as Actions from '../actions';

class App extends Component {
  render() {
    const { pivot, chartOptions, actions } = this.props;

    return (
      <div>
        <RecordsEditor pivot={pivot} actions={actions} />
        <PivotSetting pivot={pivot} actions={actions} />
        <ChartOptions chartOptions={chartOptions} actions={actions} />
        <Main pivot={pivot} chartOptions={chartOptions} actions={actions} />
      </div>
    );
  }
}

App.propTypes = {
  pivot: PropTypes.object.isRequired,
  chartOptions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

App.defaultProps = {
  pivotTableData: null,
};

function mapStateToProps(state) {
  return {
    pivot: state.pivot,
    chartOptions: state.chartOptions,
  };
}

function mapDispathToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(App);
