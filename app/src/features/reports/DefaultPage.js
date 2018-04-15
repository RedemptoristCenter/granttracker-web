import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from '../../features/app';
import * as actions from './redux/actions';
import history from '../../common/history';

export class DefaultPage extends Component {
  static propTypes = {
    reports: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Container title='Reports'>
        <div className='reports-default-page'>
          Page Content: reports/DefaultPage
        </div>
      </Container>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    reports: state.reports,
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
)(DefaultPage);
