import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Search } from '../../features/clients';
import * as actions from './redux/actions';
import * as clientActions from '../../features/clients/redux/actions';

export class ClientSearchModal extends Component {
  static propTypes = {
    modals: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    clientActions: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.selectClient = this.selectClient.bind(this);
  }

  selectClient(client) {
    this.props.clientActions.updateLocalHouseholdAddClient(client);
  }

  render() {
    return (
      <div className='modals-client-search-modal'>
        <ModalHeader toggle={this.props.toggle}>Find Household Member</ModalHeader>
        <ModalBody>
          <Search fromModal customSelect={this.selectClient} />
        </ModalBody>
        <ModalFooter>
          <Button color='warning' outline onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    modals: state.modals,
    clients: state.clients
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    clientActions: bindActionCreators({ ...clientActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientSearchModal);
