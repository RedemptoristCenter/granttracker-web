import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Create extends Component {
  static propTypes = {
    clientPdf: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="client-pdf-create">
        Page Content: client-pdf/Create
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    clientPdf: state.clientPdf,
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
)(Create);
