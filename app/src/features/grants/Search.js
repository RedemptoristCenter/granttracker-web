import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Container } from '../../features/app';
import { Form, Table } from './';
import history from '../../common/history';

export class Search extends Component {
  static propTypes = {
    grants: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Container title='Grants' createButtonLabel='+ New Grant' createButtonFunction={() => { history.push('/grants/new'); }}>
        <div className='grants-search'>
          <Form />
          <Table />
        </div>
      </Container>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    grants: state.grants,
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
)(Search);
