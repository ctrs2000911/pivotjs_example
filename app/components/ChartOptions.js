import React, { Component, PropTypes } from 'react';
import CSSModles from 'react-css-modules';
import { Card, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import style from '../styles/chart_options.scss';

class ChartOptions extends Component {
  render() {
    const { chartOptions, actions } = this.props;

    return (
      <Card>
        <CardText>
          <div styleName="container">
            <Checkbox
              label="Show Subtotal"
              styleName="checkbox"
              checked={chartOptions.showSubTotal}
              onCheck={actions.changeShowSubTotal}
            />
            <Checkbox
              label="Show Total"
              styleName="checkbox"
              checked={chartOptions.showTotal}
              onCheck={actions.changeShowTotal}
            />
          </div>
        </CardText>
      </Card>
    );
  }

}

ChartOptions.propTypes = {
  chartOptions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default CSSModles(ChartOptions, style);
