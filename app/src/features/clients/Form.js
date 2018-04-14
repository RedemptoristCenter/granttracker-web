import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form as BsForm, FormGroup, Label, Input } from 'reactstrap';
import * as actions from './redux/actions';

export class Form extends Component {
  static propTypes = {
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.checkEnter = this.checkEnter.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
  }

  state = {
    firstName: '',
    lastName: '',
    birthDate: ''
  };

  checkEnter(e) {
    if (e.keyCode === 13) {
      this.submitSearch();
    }
  }

  submitSearch() {
    this.props.actions.requestSearch(this.state);
  }

  updateStateValue(e) {
    const { name, value } = e.target;
    const newState = Object.assign(this.state);
    newState[name] = value;

    this.setState(newState);
  }

  render() {
    return (
      <div className='clients-form row justify-content-around align-items-center m-0'>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0 col'>
          <Input
            type='text'
            name='firstName'
            id='firstName'
            placeholder='First Name'
            bsSize='sm'
            value={this.state.firstName}
            onChange={this.updateStateValue}
            onKeyDown={this.checkEnter}
          />
        </FormGroup>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0 col'>
          <Input
            type='text'
            name='lastName'
            id='lastName'
            placeholder='Last Name'
            bsSize='sm'
            value={this.state.lastName}
            onChange={this.updateStateValue}
            onKeyDown={this.checkEnter}
          />
        </FormGroup>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0 col'>
          <Input
            type='date'
            max='2999-12-31'
            name='birthDate'
            id='birthDate'
            placeholder='Date of Birth'
            bsSize='sm'
            value={this.state.birthDate}
            onChange={this.updateStateValue}
            onKeyDown={this.checkEnter}
          />
        </FormGroup>
        <Button size='sm' color='primary' onClick={this.submitSearch}>Search</Button>
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
)(Form);
