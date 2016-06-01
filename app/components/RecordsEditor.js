import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import CSSModules from 'react-css-modules';
import FlatButton from 'material-ui/FlatButton';
import baseStyle from '../styles/base.scss';
import style from '../styles/records_editor.scss';

class RecordsEditor extends Component {
  constructor(props) {
    super(props);

    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent() {
    const records = this.refs.records.value || '[]';
    this.props.actions.changeRecords(records);
  }

  render() {
    const { recordString } = this.props.pivot;

    return (
      <Card className={baseStyle['content-block']}>
        <CardHeader
          title="Records"
          subtitle="records"
        />
        <CardText>
          <textarea styleName="records-editor" ref="records" defaultValue={recordString} />
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
