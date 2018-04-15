import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TabIncome extends Component {
  static propTypes = {
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.addToIncomeArray = this.addToIncomeArray.bind(this);
    this.updateIncomeArray = this.updateIncomeArray.bind(this);
    this.removeFromIncomeArray = this.removeFromIncomeArray.bind(this);
    this.renderIncomeSourceAmount = this.renderIncomeSourceAmount.bind(this);

    this.addToNonCashArray = this.addToNonCashArray.bind(this);
    this.updateNonCashArray = this.updateNonCashArray.bind(this);
    this.removeFromNonCashArray = this.removeFromNonCashArray.bind(this);
    this.renderNonCashAmount = this.renderNonCashAmount.bind(this);

    this.addToExpenditureArray = this.addToExpenditureArray.bind(this);
    this.updateExpenditureArray = this.updateExpenditureArray.bind(this);
    this.removeFromExpenditureArray = this.removeFromExpenditureArray.bind(this);
    this.renderExpenditureAmount = this.renderExpenditureAmount.bind(this);

    this.renderTotalHouseHold = this.renderTotalHouseHold.bind(this);
    this.renderTotalNetIncome = this.renderTotalNetIncome.bind(this);
  }

  addToIncomeArray() {
    const { income_source_obj } = this.props.clients;
    const newObject = Object.assign(income_source_obj);
    const lastItem = newObject[0];
    newObject.unshift({
      id: lastItem ? lastItem.id + 1 : 1,
      type: '',
      amount: 0
    });

    console.log('ding1', newObject);
    this.props.actions.updateLocalClientInfo('income_source_obj', newObject);
  }

  updateIncomeArray(key, id, value) {
    const { income_source_obj } = this.props.clients;
    const newObject = Object.assign(income_source_obj);
    const index = income_source_obj.findIndex(object => object.id === id);
    newObject[index][key] = (key === 'amount') ? parseFloat(value) : value;

    console.log('fing1', newObject);
    this.props.actions.updateLocalClientInfo('income_source_obj', newObject);
  }

  removeFromIncomeArray(id) {
    const { income_source_obj } = this.props.clients;
    const newObject = Object.assign(income_source_obj);
    const index = income_source_obj.findIndex(object => object.id === id);
    newObject.splice(index, 1);

    console.log('dong1', newObject);
    this.props.actions.updateLocalClientInfo('income_source_obj', newObject);
  }

  renderIncomeSourceAmount() {
    const { income_source_obj } = this.props.clients;
    let amount = 0;
    income_source_obj.forEach((ass) => {
      amount += parseFloat(ass.amount);
    });

    if (isNaN(amount)) {
      return '--';
    }

    return `$${amount}`;
  }

  addToNonCashArray() {
    const { non_cash_obj } = this.props.clients;
    const newObject = Object.assign(non_cash_obj);
    const lastItem = newObject[0];
    newObject.unshift({
      id: lastItem ? lastItem.id + 1 : 1,
      type: '',
      amount: 0
    });

    console.log('ding2', newObject);
    this.props.actions.updateLocalClientInfo('non_cash_obj', newObject);
  }

  updateNonCashArray(key, id, value) {
    const { non_cash_obj } = this.props.clients;
    const newObject = Object.assign(non_cash_obj);
    const index = non_cash_obj.findIndex(object => object.id === id);
    newObject[index][key] = (key === 'amount') ? parseFloat(value) : value;

    console.log('fing2', newObject);
    this.props.actions.updateLocalClientInfo('non_cash_obj', newObject);
  }

  removeFromNonCashArray(id) {
    const { non_cash_obj } = this.props.clients;
    const newObject = Object.assign(non_cash_obj);
    const index = non_cash_obj.findIndex(object => object.id === id);
    newObject.splice(index, 1);

    console.log('dong2', newObject);
    this.props.actions.updateLocalClientInfo('non_cash_obj', newObject);
  }

  renderNonCashAmount() {
    const { non_cash_obj } = this.props.clients;
    let amount = 0;
    non_cash_obj.forEach((ass) => {
      amount += parseFloat(ass.amount);
    });

    if (isNaN(amount)) {
      return '--';
    }

    return `$${amount}`;
  }

  addToExpenditureArray() {
    const { expenditure_obj } = this.props.clients;
    const newObject = Object.assign(expenditure_obj);
    const lastItem = newObject[0];
    newObject.unshift({
      id: lastItem ? lastItem.id + 1 : 1,
      type: '',
      amount: 0
    });

    console.log('ding3', newObject);
    this.props.actions.updateLocalClientInfo('expenditure_obj', newObject);
  }

  updateExpenditureArray(key, id, value) {
    const { expenditure_obj } = this.props.clients;
    const newObject = Object.assign(expenditure_obj);
    const index = expenditure_obj.findIndex(object => object.id === id);
    newObject[index][key] = (key === 'amount') ? parseFloat(value) : value;

    console.log('fing3', newObject);
    this.props.actions.updateLocalClientInfo('expenditure_obj', newObject);
  }

  removeFromExpenditureArray(id) {
    const { expenditure_obj } = this.props.clients;
    const newObject = Object.assign(expenditure_obj);
    const index = expenditure_obj.findIndex(object => object.id === id);
    newObject.splice(index, 1);

    console.log('dong3', newObject);
    this.props.actions.updateLocalClientInfo('expenditure_obj', newObject);
  }

  renderExpenditureAmount() {
    const { expenditure_obj } = this.props.clients;
    let amount = 0;
    expenditure_obj.forEach((ass) => {
      amount += parseFloat(ass.amount);
    });

    if (isNaN(amount)) {
      return '--';
    }

    return `$${amount}`;
  }

  renderTotalHouseHold() {
    const { income_source_obj, non_cash_obj } = this.props.clients;
    let income_amount = 0;
    income_source_obj.forEach((ass) => {
      income_amount += parseFloat(ass.amount);
    });
    if (isNaN(income_amount)) { income_amount = 0; }

    let non_cash_amount = 0;
    non_cash_obj.forEach((ass) => {
      non_cash_amount += parseFloat(ass.amount);
    });
    if (isNaN(non_cash_amount)) { non_cash_amount = 0; }


    return income_amount + non_cash_amount;
  }

  renderTotalNetIncome() {
    const household_income = this.renderTotalHouseHold();
    const { expenditure_obj } = this.props.clients;

    let exp_amount = 0;
    expenditure_obj.forEach((ass) => {
      exp_amount += parseFloat(ass.amount);
    });
    if (isNaN(exp_amount)) { exp_amount = 0; }

    console.log('leeeee', household_income, exp_amount);

    return household_income - exp_amount;
  }

  render() {
    return (
      <div className='clients-tab-income pt-3'>
        <h4>
          Income Sources, Last 30 Days (Total: {this.renderIncomeSourceAmount()})
          <span className='float-right modals-assistance-wizard-modal__add-icon' onClick={this.addToIncomeArray}><i className='fas fa-plus' /></span>
        </h4>
        {
          this.props.clients.income_source_obj.map(income => (
            <div className='row align-items-center mt-3' key={`assistance-object-${income.id}`}>
              <div className='col'>
                <Input type='select' name='type' value={income.type} onChange={(e) => { this.updateIncomeArray('type', income.id, e.target.value); }}>
                  <option value=''>Select a source of income</option>
                  <option value='Earned Income'>Earned Income</option>
                  <option value='Unemployment Insurance'>Unemployment Insurance</option>
                  <option value='Supplemental Security Income'>Supplemental Security Income</option>
                  <option value='Social Security Disability Income'>Social Security Disability Income</option>
                  <option value='VA Service Connected Disability Compensation'>VA Service Connected Disability Compensation</option>
                  <option value='Private Disability Insurance'>Private Disability Insurance</option>
                  <option value='Workers Compensation'>Worker's Compensation</option>
                  <option value='Temporary Assistance for Needy Families'>Temporary Assistance for Needy Families</option>
                  <option value='General Assistance'>General Assistance</option>
                  <option value='Retirement Income from Social Security'>Retirement Income from Social Security</option>
                  <option value='VA Non-Service Connected Disability Pension'>VA Non-Service Connected Disability Pension</option>
                  <option value='Pension From a Former Job'>Pension From a Former Job</option>
                  <option value='Child Support'>Child Support</option>
                  <option value='Alimony or Other Spousal Support'>Alimony or Other Spousal Support</option>
                  <option value='Other'>Other</option>
                </Input>
              </div>
              <div className='col'>
                <Input type='number' name='amount' value={income.amount} placeholder='Amount' onChange={(e) => { this.updateIncomeArray('amount', income.id, e.target.value); }} />
              </div>
              <div className='col' onClick={() => { this.removeFromIncomeArray(income.id); }}>
                <i className='fas fa-times' />
              </div>
            </div>
          ))
        }
        <hr />
        <h4>
          Non-Cash Benefits And Amounts (Total: {this.renderNonCashAmount()})
          <span className='float-right modals-assistance-wizard-modal__add-icon' onClick={this.addToNonCashArray}><i className='fas fa-plus' /></span>
        </h4>
        {
          this.props.clients.non_cash_obj.map(non_cash => (
            <div className='row align-items-center mt-3' key={`assistance-object-${non_cash.id}`}>
              <div className='col'>
                <Input type='select' name='type' value={non_cash.type} onChange={(e) => { this.updateNonCashArray('type', non_cash.id, e.target.value); }}>
                  <option value=''>Select a non-cash benefit</option>
                  <option value='SNAP/Food Stamps or Benefits Card'>SNAP/Food Stamps or Benefits Card</option>
                  <option value='Special Supplemental Nutrition Program (WIC)'>Special Supplemental Nutrition Program (WIC)</option>
                  <option value='TANF Services'>TANF Services</option>
                  <option value='Section 8, Public Housing, etc...'>Section 8, Public Housing, etc...</option>
                  <option value='Other Source'>Other Source</option>
                  <option value='Temporary Rental Assistance'>Temporary Rental Assistance</option>
                  <option value='Child Support'>Child Support</option>
                </Input>
              </div>
              <div className='col'>
                <Input type='number' name='amount' value={non_cash.amount} placeholder='Amount' onChange={(e) => { this.updateNonCashArray('amount', non_cash.id, e.target.value); }} />
              </div>
              <div className='col' onClick={() => { this.removeFromNonCashArray(non_cash.id); }}>
                <i className='fas fa-times' />
              </div>
            </div>
          ))
        } <hr />
        <h4>
          Expenditure Types, Last 30 Days (Total: {this.renderExpenditureAmount()})
          <span className='float-right modals-assistance-wizard-modal__add-icon' onClick={this.addToExpenditureArray}><i className='fas fa-plus' /></span>
        </h4>
        {
          this.props.clients.expenditure_obj.map(expenditure => (
            <div className='row align-items-center mt-3' key={`assistance-object-${expenditure.id}`}>
              <div className='col'>
                <Input type='select' name='type' value={expenditure.type} onChange={(e) => { this.updateExpenditureArray('type', expenditure.id, e.target.value); }}>
                  <option value=''>Select an expenditure</option>
                  <option value='Rent/Mortgage'>Rent/Mortgage</option>
                  <option value='Electricity'>Electricity</option>
                  <option value='Gas/Heating Oil'>Gas/Heating Oil</option>
                  <option value='Sewage/Trash'>Sewage/Trash</option>
                  <option value='Telephone/Communications'>Telephone/Communications</option>
                  <option value='Water'>Water</option>
                  <option value='Food (excluding food stamps)'>Food (excluding food stamps)</option>
                  <option value='Medical'>Medical</option>
                  <option value='Transportation'>Transportation</option>
                  <option value='Car Payment'>Car Payment</option>
                  <option value='Gasoline'>Gasoline</option>
                  <option value='Insurance'>Insurance</option>
                  <option value='Child Care'>Child Care</option>
                  <option value='Health Insurance'>Health Insurance</option>
                  <option value='Withholding Tax'>Withholding Tax</option>
                  <option value='Other'>Other</option>
                </Input>
              </div>
              <div className='col'>
                <Input type='number' name='amount' value={expenditure.amount} placeholder='Amount' onChange={(e) => { this.updateExpenditureArray('amount', expenditure.id, e.target.value); }} />
              </div>
              <div className='col' onClick={() => { this.removeFromExpenditureArray(expenditure.id); }}>
                <i className='fas fa-times' />
              </div>
            </div>
          ))
        }
        <hr />
        <div className='row'>
          <div className='col'><strong>Total Household Income: </strong>${this.renderTotalHouseHold()}</div>
          <div className='col'><strong>Total Net Income: </strong>${this.renderTotalNetIncome()}</div>
        </div>
      </div>
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
)(TabIncome);
