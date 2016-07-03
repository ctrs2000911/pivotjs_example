import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { Card, CardHeader } from 'material-ui/Card';
import RecordsEditor from '../components/RecordsEditor';
import ChartOptions from '../components/ChartOptions';
import PivotSetting from '../components/PivotSetting';
import PivotTable from '../components/PivotTable';
import * as Actions from '../actions';
import style from '../styles/base.scss';

class App extends Component {
  render() {
    const { pivot, chartOptions, actions, params } = this.props;

    return (
      <div styleName="content-container">
        <RecordsEditor pivot={pivot} actions={actions} params={params} />
        <Card styleName="content-block">
          <CardHeader
            title="Pivot Table"
          />
          <ChartOptions chartOptions={chartOptions} actions={actions} />
          <Card styleName="pivot-block-container">
            <div styleName="pivot-block">
              <PivotTable pivot={pivot} chartOptions={chartOptions} />
              <PivotSetting pivot={pivot} chartOptions={chartOptions} actions={actions} />
            </div>
          </Card>
        </Card>
      </div>
    );
  }
}

App.propTypes = {
  pivot: PropTypes.object.isRequired,
  chartOptions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object,
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
)(CSSModules(App, style));
