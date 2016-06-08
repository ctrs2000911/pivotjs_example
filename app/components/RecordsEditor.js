import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import CSSModules from 'react-css-modules';
import FlatButton from 'material-ui/FlatButton';
import style from '../styles/base.scss';

class RecordsEditor extends Component {
  constructor(props) {
    super(props);

    this.textFieldStyle = {
      width: '100%',
    };

    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent() {
    const records = this.refs.records.getValue() || '[]';
    this.props.actions.changeRecords(records);
  }

  render() {
    const { recordString } = this.props.pivot;

    return (
      <Card styleName="content-block">
        <CardHeader
          title="Records(JSON)"
        />
        <CardText>
          <TextField
            id="records"
            ref="records"
            defaultValue={recordString}
            multiLine
            rows={10}
            rowsMax={15}
            style={this.textFieldStyle}
          />
        </CardText>
        <CardActions>
          <FlatButton label="Apply" onClick={this.handleEvent} />
        </CardActions>
      </Card>
    );
  }
}

RecordsEditor.propTypes = {
  pivot: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default CSSModules(RecordsEditor, style);
