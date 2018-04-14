import React, { Component } from 'react';
import { Button } from 'reactstrap';
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

  render() {
    return (
      <div className={`common-assistance-log p-0 ${this.props.className}`}>
        <h4 className='text-center'>{this.props.name}</h4>
        <div className='common-assistance-log__listing p-3'>
          <p className='small text-center'>No listings available.</p>
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
