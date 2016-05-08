import React, { Component, PropTypes } from 'react';

class RecordsEditor extends Component {
  constructor(prop) {
    super(prop);

    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent() {
    const records = this.refs.records.value || '[]';
    this.props.actions.changeRecords(records);
  }

  render() {
    const { recordString } = this.props.pivot;

    return (
      <div>
        <textarea className="records-editor" ref="records" defaultValue={recordString} />
        <input type="button" value="change" onClick={this.handleEvent} />
      </div>
    );
  }
}

RecordsEditor.propTypes = {
  pivot: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default RecordsEditor;
