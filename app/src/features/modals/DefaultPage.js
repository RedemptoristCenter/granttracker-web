import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { ClientSearchModal, AssistanceWizardModal } from './';

export class DefaultPage extends Component {
  static propTypes = {
    modals: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
  }

  toggle() {
    return this.props.actions.closeModal();
  }

  /**
   * renderModalContent - renders a component inside of a modal
   * @returns {*|string}
   */
  renderModalContent() {
    let modal = null;
    console.log('renderModalContent triggered', this.props.modals.currentModal);

    switch (this.props.modals.currentModal) {
      case 'ClientSearchModal':
        modal = <ClientSearchModal toggle={this.toggle} />;
        break;
      case 'AssistanceWizardModal':
        modal = <AssistanceWizardModal toggle={this.toggle} />;
        break;
      default:
        break;
    }

    return (
      modal || ''
    );
  }

  render() {
    return (
      <Modal id='content-modal' isOpen={this.props.modals.open} toggle={this.toggle} size={this.props.modals.modalSize}>
        {this.renderModalContent()}
      </Modal>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    modals: state.modals,
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
