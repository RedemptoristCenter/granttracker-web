import React, { Component } from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class AssistanceLog extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    data: PropTypes.array.isRequired,
    selectFunction: PropTypes.func,
    buttonLabel: PropTypes.string,
    buttonFunction: PropTypes.func
  };

  renderRecords() {
    const { data } = this.props;

    return (
      <div>
        {
          data.map(record => (
            <div className='common-assistance-log__listing-item'>
              {
                record.trans_type === 'Financial' ?
                  <p>
                    ${record.amount} from {record.grant_name}
                    <span className='small d-block'>on {moment.unix(record.date).format('MM/DD/YYYY')}</span>
                    <span className='small d-block'>Financial Assistance</span>
                  </p>
                  :
                  <p>
                    {record.trans_notes}
                    <span className='small d-block'>on {moment.unix(record.date).format('MM/DD/YYYY')}</span>
                    <span className='small d-block'>Non-Financial Assistance</span>
                  </p>
              }
            </div>
            ))
        }
      </div>
    );
  }

  render() {
    return (
      <div className={`common-assistance-log p-0 ${this.props.className}`}>
        <h4 className='text-center'>{this.props.name}</h4>
        <div className='common-assistance-log__listing p-3'>
          {this.props.data.length > 0 ? this.renderRecords() : <p className='small text-center'>No listings available.</p>}
        </div>
        {
          this.props.buttonLabel ?
            <div className='common-assistance-log__action-button'>
              <Button block color='success' onClick={this.props.buttonFunction}>{this.props.buttonLabel}</Button>
            </div>
            :
            ''
        }
      </div>
    );
  }
}
