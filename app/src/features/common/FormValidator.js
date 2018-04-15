import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class FormValidator extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    value: PropTypes.any.isRequired
  };

  render() {
    let value = this.props.value !== null 
    && this.props.value !== '' 
    && this.props.value !== undefined
    && this.props.value !== 'Invalid date' ? true : false;
  
    return (
      <div className='common-form-validator'>
        {this.props.children}
        {value? '': <div className='common-form-validator__error'>Required</div>}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormValidator);
