import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AssistanceLog extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    data: PropTypes.array.isRequired,
    selectFunction: PropTypes.func,
    button: PropTypes.any
  };

  render() {
    return (
      <div className={`common-assistance-log ${this.props.className}`}>
        <h4 className='text-center'>{this.props.name}</h4>
      </div>
    );
  }
}
