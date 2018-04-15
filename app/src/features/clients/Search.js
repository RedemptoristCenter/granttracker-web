import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UncontrolledAlert } from 'reactstrap';
import * as actions from './redux/actions';
import { Container } from '../../features/app';
import { Form, Table } from './';
import history from '../../common/history';

export class Search extends Component {
  static propTypes = {
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    fromModal: PropTypes.bool,
    customSelect: PropTypes.func
  };

  render() {
    if (this.props.fromModal) {
      return (
        <div className='clients-search'>
          <Form />
          <Table customSelect={this.props.customSelect} />
        </div>
      );
    }

    return (
      <Container title='Clients' createButtonLabel='+ New Client' createButtonFunction={() => { history.push('/clients/new'); }}>
        {this.props.clients.requestSearchError? 
        <UncontrolledAlert color="danger">Something went wrong, please try again. Refresh the page if the issue continues.</UncontrolledAlert> 
        :''}
        <div className='clients-search'>
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
    clients: state.clients,
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
