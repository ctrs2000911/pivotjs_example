import React, { Component, PropTypes } from 'react';

class ChartOptions extends Component {
  render() {
    const { chartOptions, actions } = this.props;

    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={chartOptions.showSubTotal}
            onChange={actions.changeShowSubTotal}
          />
          Show Sub Total
        </label>

        <label>
          <input
            type="checkbox"
            checked={chartOptions.showTotal}
            onChange={actions.changeShowTotal}
          />
          Show Total
        </label>
      </div>
    );
  }

}

ChartOptions.propTypes = {
  chartOptions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default ChartOptions;
