import React, { Component } from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RecordData from '../logic/RecordData';
import style from '../styles/base.scss';

class RecordsList extends Component {
  constructor(props) {
    super(props);

    const recordData = new RecordData();
    this.recordList = recordData.records;
  }

  render() {
    return (
      <Card styleName="content-block">
        <CardHeader
          title="Records"
        />
        <CardText>
          <ul styleName="record-list">
            {this.recordList.map((record, index) =>
              <li key={index}><Link to={`/${index}`}>{record.name}</Link></li>
            )}
          </ul>
        </CardText>
      </Card>
    );
  }
}

RecordsList.propTypes = {};

export default CSSModules(RecordsList, style);
