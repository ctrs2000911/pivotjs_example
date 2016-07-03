import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import CSSModules from 'react-css-modules';
import FlatButton from 'material-ui/FlatButton';
import RecordData from '../logic/RecordData';
import style from '../styles/base.scss';

class RecordsEditor extends Component {
  constructor(props) {
    super(props);

    this.textFieldStyle = {
      width: '100%',
    };

    this.state = {
      records: '[]',
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
  }

  componentWillMount() {
    const id = parseInt(this.props.params.id, 10);

    const recordData = new RecordData();
    const records = recordData.getAt(id);

    this.setState({ records });
    this.props.actions.changeRecords(records);
  }

  changeEvent(e) {
    this.setState({
      records: e.target.value,
    });
  }

  handleEvent() {
    const records = this.refs.records.getValue() || '[]';
    this.props.actions.changeRecords(records);
  }

  render() {
    return (
      <Card styleName="content-block">
        <CardHeader
          title="Records(JSON)"
        />
        <CardText>
          <TextField
            id="records"
            ref="records"
            defaultValue={this.state.records}
            multiLine
            rows={10}
            rowsMax={15}
            style={this.textFieldStyle}
            onChange={this.handleChange}
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
  params: PropTypes.object,
};

export default CSSModules(RecordsEditor, style);
