import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import FormValidator from '../.././Features/Common/FormValidator';
import * as actions from './redux/actions';

export class TabProfile extends Component {
  static propTypes = {
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleConsent = this.toggleConsent.bind(this);
  }

  state = {
    consent: false
  };

  handleChangeEvent(e) {
    const { name, value } = e.target;
    this.props.actions.updateLocalClientInfo(name, value);
  }

  handleDateChange(date) {
    this.props.actions.updateLocalClientInfo('birth_date', moment(date.target.value).unix());
  }

  toggleConsent(e) {
    const { checked } = e.target;
    console.log('checked', checked);
    this.setState({
      consent: !checked
    });
  }

  render() {
    const { clientInfo } = this.props.clients;
    if (!clientInfo) { return ''; }
    return (
      <div className='clients-tab-profile mt-4'>
        <div className='row'>
          <FormGroup className='col'>
            <FormValidator value={clientInfo.Lname || ''}>
              <Label for='Lname'>Last Name</Label>
              <Input type='text' name='Lname' id='Lname' value={clientInfo.Lname || ''} onChange={this.handleChangeEvent} />
            </FormValidator>
          </FormGroup>
          <FormGroup className='col'>
            <FormValidator value={clientInfo.Fname || ''}>
              <Label for='Fname'>First Name</Label>
              <Input type='text' name='Fname' id='Fname' value={clientInfo.Fname || ''} onChange={this.handleChangeEvent} />
            </FormValidator>
          </FormGroup>
          <FormGroup className='col-2'>
            <FormValidator value={clientInfo.Mname || ''}>
              <Label for='Mname'>M. Initial</Label>
              <Input type='text' name='Mname' id='Mname' value={clientInfo.Mname || ''} onChange={this.handleChangeEvent} />
            </FormValidator>  
          </FormGroup>
          <FormGroup className='col'>
            <FormValidator value={moment.unix(clientInfo.birth_date).format("YYYY-MM-DD")}>
              <Label for='birth_date'>Date of Birth</Label>
              <Input
                type='date'
                max='2999-12-31'
                name='birthDateView'
                id='birthDate'
                placeholder='Date of Birth'
                bsSize='sm'
                value={moment.unix(clientInfo.birth_date).format("YYYY-MM-DD")}
                onChange={this.handleDateChange}
              />
            </FormValidator>
          </FormGroup>
        </div>
        <div className='row mt-3'>
          <FormGroup className='col-6'>
            <FormValidator value={clientInfo.address || ''}>
              <Label for='address'>Street Address</Label>
              <Input type='text' name='address' id='address' value={clientInfo.address || ''} onChange={this.handleChangeEvent} />
            </FormValidator>  
          </FormGroup>
          <FormGroup className='col'>
            <FormValidator value={clientInfo.city || ''}>
              <Label for='city'>City</Label>
              <Input type='text' name='city' id='city' value={clientInfo.city || ''} onChange={this.handleChangeEvent} />
            </FormValidator>
          </FormGroup>
          <FormGroup className='col-2'>
            <FormValidator value={clientInfo.state || ''}>
              <Label for='state'>State</Label>
              <Input type='text' name='state' id='state' value={clientInfo.state || ''} onChange={this.handleChangeEvent} />
            </FormValidator>
          </FormGroup>
          <FormGroup className='col'>
            <FormValidator value={clientInfo.zipcode || ''}>
              <Label for='zipcode'>Zip Code</Label>
              <Input type='text' name='zipcode' id='zipcode' value={clientInfo.zipcode || ''} onChange={this.handleChangeEvent} />
            </FormValidator>
          </FormGroup>
        </div>
        <div className='row mt-3'>
          <FormGroup className='col-12'>
            <FormValidator value={clientInfo.phone_num || ''}>
              <Label for='phone_num'>Phone Number</Label>
              <Input type='text' name='phone_num' id='phone_num' value={clientInfo.phone_num || ''} onChange={this.handleChangeEvent} />
            </FormValidator>
          </FormGroup>
        </div>
        <div className='row mt-3 align-items-end'>
          <div className='col'>
            <Label for='ssn_cd'>SSN</Label>
            <Input type='select' name='ssn_cd' id='ssn_cd' value={clientInfo.ssn_cd} onChange={this.handleChangeEvent}>
              {
                this.props.clients.SSN.map(ssn => <option key={`gender-option-${ssn.id}`} value={ssn.id}>{ssn.name}</option>)
              }
            </Input>
          </div>
          <div className='col'>
            <FormGroup check>
              <Label for='check-consent'>
                <Input type='checkbox' name='consent' id='check-consent' onChange={this.toggleConsent} value={this.state.consent} /> Client has consented to provide this information
              </Label>
            </FormGroup>
          </div>
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
)(TabProfile);
