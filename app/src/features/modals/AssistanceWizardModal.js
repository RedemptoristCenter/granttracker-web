import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import * as actions from './redux/actions';

export class AssistanceWizardModal extends Component {
  static propTypes = {
    modals: PropTypes.object.isRequired,
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.changePosition = this.changePosition.bind(this);
    this.updateState = this.updateState.bind(this);
    this.addToNeedArray = this.addToNeedArray.bind(this);
    this.removeFromNeedArray = this.removeFromNeedArray.bind(this);
    this.updateNeedArray = this.updateNeedArray.bind(this);
    this.addToFundArray = this.addToFundArray.bind(this);
    this.removeFromFundArray = this.removeFromFundArray.bind(this);
    this.updateFundArray = this.updateFundArray.bind(this);
    this.submitAddAssistance = this.submitAddAssistance.bind(this);
  }

  state = {
    position: 'type',
    trans_notes: '',
    assistance_cd: '',
    assistance_transaction_obj: [],
    assistance_funds: []
  };

  componentDidMount() {
    this.props.actions.requestCurrentGrants();
  }

  changePosition(position) {
    this.setState({
      position
    });
  }

  updateState(e) {
    const { name, value } = e.target;
    console.log('ding', name, value);
    const newState = Object.assign(this.state);
    newState[name] = value;

    this.setState(newState);
  }

  addToNeedArray() {
    const { assistance_transaction_obj } = this.state;
    const newObject = Object.assign(assistance_transaction_obj);
    const lastItem = newObject[0];
    newObject.unshift({
      id: lastItem ? lastItem.id + 1 : 1,
      need: '',
      amount: 0,
      note: ''
    });

    console.log('ding', newObject);

    this.setState({
      assistance_transaction_obj: newObject
    });
  }

  addToFundArray() {
    const { assistance_funds } = this.state;
    const newObject = Object.assign(assistance_funds);
    const lastItem = newObject[0];
    newObject.unshift({
      id: lastItem ? lastItem.id + 1 : 1,
      grant_id: '',
      amount: 0
    });

    console.log('ding2', newObject);

    this.setState({
      assistance_funds: newObject
    });
  }

  removeFromNeedArray(id) {
    const { assistance_transaction_obj } = this.state;
    const newObject = Object.assign(assistance_transaction_obj);
    const index = assistance_transaction_obj.findIndex(object => object.id === id);
    newObject.splice(index, 1);

    console.log('dong', newObject);

    this.setState({
      assistance_transaction_obj: newObject
    });
  }

  removeFromFundArray(id) {
    const { assistance_funds } = this.state;
    const newObject = Object.assign(assistance_funds);
    const index = assistance_funds.findIndex(object => object.id === id);
    newObject.splice(index, 1);

    console.log('dong2', newObject);

    this.setState({
      assistance_funds: newObject
    });
  }

  updateNeedArray(key, id, value) {
    const { assistance_transaction_obj } = this.state;
    const newObject = Object.assign(assistance_transaction_obj);
    const index = assistance_transaction_obj.findIndex(object => object.id === id);
    newObject[index][key] = (key === 'amount') ? parseFloat(value) : value;

    console.log('fing', newObject);

    this.setState({
      assistance_transaction_obj: newObject
    });
  }

  updateFundArray(key, id, value) {
    const { assistance_funds } = this.state;
    const newObject = Object.assign(assistance_funds);
    const index = assistance_funds.findIndex(object => object.id === id);
    newObject[index][key] = (key === 'amount') ? parseFloat(value) : parseInt(value);

    console.log('fing2', newObject);

    this.setState({
      assistance_funds: newObject
    });
  }

  submitAddAssistance() {
    const { clientInfo } = this.props.clients;
    const transType = this.state.assistance_cd ? 'Financial' : 'Non Financial';

    const body = {
      client_id: clientInfo.client_id,
      trans_type: transType,
      reason_cd: parseInt(this.state.assistance_cd),
      grants: this.state.assistance_funds,
      assistance_transaction_obj: this.state.assistance_transaction_obj,
      trans_notes: this.state.trans_notes
    };

    console.log('body', body);

    this.props.actions.requestCreateTransaction(body).then(() => {
      this.setState({
        position: 'success'
      });
    });
  }

  renderTypeSelect() {
    return (
      <div>
        <h2 className='text-center'>Select type of assistance:</h2>
        <div className='row mt-3'>
          <div className='col-3'>&nbsp;</div>
          <div className='col-3 modals-assistance-wizard-modal__type' onClick={() => { this.changePosition('nonFinancial'); }}>
            <p className='modals-assistance-wizard-modal__type-icon text-center'>
              <i className='fas fa-hands-helping' />
            </p>
            <p className='text-center'>Non-Financial</p>
          </div>
          <div className='col-3 modals-assistance-wizard-modal__type' onClick={() => { this.changePosition('financial'); }}>
            <p className='modals-assistance-wizard-modal__type-icon text-center'>
              <i className='fas fa-money-bill-alt' />
            </p>
            <p className='text-center'>Financial</p>
          </div>
          <div className='col-3'>&nbsp;</div>
        </div>
      </div>
    );
  }

  renderNonFinancial() {
    return (
      <div>
        <h2 className='text-center'>Detail the assistance that was provided:</h2>
        <div className='row'>
          <div className='col-8 offset-2'>
            <FormGroup>
              <Label for='trans_notes'>Clothing, food, etc...</Label>
              <Input type='textarea' name='trans_notes' id='trans_notes' value={this.state.trans_notes} onChange={this.updateState} />
            </FormGroup>
            <Button color='primary' block onClick={this.submitAddAssistance}>Add Assistance</Button>
          </div>
        </div>
      </div>
    );
  }

  renderAssistanceAmount() {
    const { assistance_transaction_obj } = this.state;
    let amount = 0;
    assistance_transaction_obj.forEach((ass) => {
      amount += parseFloat(ass.amount);
    });

    if (isNaN(amount)) {
      return '--';
    }

    return `$${amount}`;
  }

  renderFundingAmount() {
    const { assistance_funds } = this.state;
    let amount = 0;
    assistance_funds.forEach((ass) => {
      amount += parseFloat(ass.amount);
    });

    if (isNaN(amount)) {
      return '--';
    }

    return `$${amount}`;
  }

  renderFinancial() {
    return (
      <div>
        <h2 className='text-center'>Detail the needs and funds for financial assistance:</h2>
        <div className='row mt-3'>
          <div className='col-10 offset-1'>
            <FormGroup>
              <Label for='assistance_cd'>Type of assistance needed:</Label>
              <Input type='select' name='assistance_cd' id='assistance_cd' value={this.state.assistance_cd} onChange={this.updateState}>
                <option value=''>Select an option</option>
                {
                  this.props.clients.ASSISTANCE_REASON.map(reason => <option key={`assistance-reason-${reason.id}`} value={reason.id}>{reason.name}</option>)
                }
              </Input>
            </FormGroup>

            <hr />
            <h4>
              Assistance to Provide ({this.renderAssistanceAmount()})
              <span className='float-right modals-assistance-wizard-modal__add-icon' onClick={this.addToNeedArray}><i className='fas fa-plus' /></span>
            </h4>
            {
              this.state.assistance_transaction_obj.map(assistance => (
                <div className='row align-items-center mt-3' key={`assistance-object-${assistance.id}`}>
                  <div className='col'>
                    <Input type='select' name='need' value={assistance.need} onChange={(e) => { this.updateNeedArray('need', assistance.id, e.target.value); }}>
                      <option value=''>Select a need</option>
                      <option value='Rent'>Rent</option>
                      <option value='Utility'>Utility</option>
                      <option value='Medical'>Medical</option>
                    </Input>
                  </div>
                  <div className='col'>
                    <Input type='number' name='amount' value={assistance.amount} placeholder='Amount' onChange={(e) => { this.updateNeedArray('amount', assistance.id, e.target.value); }} />
                  </div>
                  <div className='col'>
                    <Input type='text' name='note' value={assistance.note} placeholder='Notes' onChange={(e) => { this.updateNeedArray('note', assistance.id, e.target.value); }} />
                  </div>
                  <div className='col' onClick={() => { this.removeFromNeedArray(assistance.id); }}>
                    <i className='fas fa-times' />
                  </div>
                </div>
                ))
            }
            <hr />
            <h4>
              Funds to Use ({this.renderFundingAmount()})
              <span className='float-right modals-assistance-wizard-modal__add-icon' onClick={this.addToFundArray}><i className='fas fa-plus' /></span>
            </h4>
            {
              this.state.assistance_funds.map(fund => (
                <div className='row align-items-center mt-3' key={`assistance-object-${fund.id}`}>
                  <div className='col'>
                    <Input type='select' name='grant_id' value={fund.grant_id} onChange={(e) => { this.updateFundArray('grant_id', fund.id, e.target.value); }}>
                      <option value=''>Select a grant</option>
                      {
                        this.props.modals.grants.map(grant => <option key={`grant-option-${grant.grant_id}`} value={grant.grant_id}>{grant.grant_name} - ${grant.remaining_amount}</option>)
                      }
                    </Input>
                  </div>
                  <div className='col'>
                    <Input type='number' name='amount' value={fund.amount} placeholder='Amount' onChange={(e) => { this.updateFundArray('amount', fund.id, e.target.value); }} />
                  </div>
                  <div className='col' onClick={() => { this.removeFromFundArray(fund.id); }}>
                    <i className='fas fa-times' />
                  </div>
                </div>
              ))
            }
            <hr />
            <Button color='primary' block onClick={this.submitAddAssistance}>Add Assistance</Button>
          </div>
        </div>
      </div>
    );
  }

  renderSuccess() {
    return (
      <div className='text-center modals-assistance-wizard-modal__success-icon'>
        <h2>All done!</h2>
        <i className='far fa-thumbs-up' />
      </div>
    );
  }

  renderAllTheThings() {
    const { position } = this.state;

    if (position === 'type') {
      return this.renderTypeSelect();
    }

    if (position === 'nonFinancial') {
      return this.renderNonFinancial();
    }

    if (position === 'financial') {
      return this.renderFinancial();
    }

    if (position === 'success') {
      return this.renderSuccess();
    }

    return '';
  }

  render() {
    return (
      <div className='modals-assistance-wizard-modal'>
        <ModalHeader toggle={this.props.toggle}>Assistance Wizard</ModalHeader>
        <ModalBody>
          {this.renderAllTheThings()}
        </ModalBody>
        <ModalFooter>
          <Button color='primary' outline onClick={() => { window.print(); }}>Print</Button>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssistanceWizardModal);
