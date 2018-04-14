import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from '../../features/app';
import * as actions from './redux/actions';
import history from '../../common/history';

export class Detail extends Component {
  static propTypes = {
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { client_id } = this.props.match.params;
    this.props.actions.requestClientById({ client_id });

    console.log('client_id', client_id);
  }

  renderClientInfo() {
    const { clientInfo } = this.props.clients;
    console.log(clientInfo);
    if (!clientInfo) { return ''; }

    return (
      <div>
        <h2>
          <span className='clients-detail__back-arrow' onClick={() => { history.push('/clients'); }}><i className='fas fa-arrow-left' /></span>
          &nbsp;&nbsp;&nbsp;{clientInfo.Fname} {clientInfo.Lname}
        </h2>
      </div>
    );
  }

  render() {
    return (
      <Container title='Clients'>
        <div className='clients-detail'>
          {this.props.clients.requestClientByIdPending ? 'Loading...' : this.renderClientInfo()}
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
