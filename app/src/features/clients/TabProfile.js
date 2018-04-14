import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
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
  }

  handleChangeEvent(e) {
    const { name, value } = e.target;
    this.props.actions.updateLocalClientInfo(name, value);
  }

  handleDateChange(date) {
    this.props.actions.updateLocalClientInfo('birth_date', moment(date.target.value).unix());
  }

  render() {
    const { clientInfo } = this.props.clients;
    return (
      <div className='clients-tab-profile mt-4'>
        <div className='row'>
          <FormGroup className='col'>
            <Label for='Lname'>Last Name</Label>
            <Input type='text' name='Lname' id='Lname' value={clientInfo.Lname || ''} onChange={this.handleChangeEvent} />
          </FormGroup>
          <FormGroup className='col'>
            <Label for='Fname'>First Name</Label>
            <Input type='text' name='Fname' id='Fname' value={clientInfo.Fname || ''} onChange={this.handleChangeEvent} />
          </FormGroup>
          <FormGroup className='col-2'>
            <Label for='Mname'>M. Initial</Label>
            <Input type='text' name='Mname' id='Mname' value={clientInfo.Mname || ''} onChange={this.handleChangeEvent} />
          </FormGroup>
          <FormGroup className='col'>
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
          </FormGroup>
        </div>
        <div className='row mt-3'>
          <FormGroup className='col-6'>
            <Label for='address'>Street Address</Label>
            <Input type='text' name='address' id='address' value={clientInfo.address || ''} onChange={this.handleChangeEvent} />
          </FormGroup>
          <FormGroup className='col'>
            <Label for='city'>City</Label>
            <Input type='text' name='city' id='city' value={clientInfo.city || ''} onChange={this.handleChangeEvent} />
          </FormGroup>
          <FormGroup className='col-2'>
            <Label for='state'>State</Label>
            <Input type='text' name='state' id='state' value={clientInfo.state || ''} onChange={this.handleChangeEvent} />
          </FormGroup>
          <FormGroup className='col'>
            <Label for='zipcode'>Zip Code</Label>
            <Input type='text' name='zipcode' id='zipcode' value={clientInfo.zipcode || ''} onChange={this.handleChangeEvent} />
          </FormGroup>
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
