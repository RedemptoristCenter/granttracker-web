import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Form as BsForm, FormGroup, Input } from 'reactstrap';

export class Form extends Component {
  static propTypes = {
    grants: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.checkEnter = this.checkEnter.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  state = {
    grantName: '',
    startDate: '',
    endDate: ''
  };

  checkEnter(e) {
    if (e.keyCode === 13) {
      this.submitSearch();
    }
  }

  updateStateValue(e) {
    const { name, value } = e.target;
    const newState = Object.assign(this.state);
    newState[name] = value;

    this.setState(newState);
  }

  submitSearch() {
    this.props.actions.requestSearch(this.state);
  }

  render() {
    return (
      <div className='grants-form row justify-content-around align-items-center m-0'>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0 col'>
          <Input
            type='text'
            name='grantName'
            id='grantName'
            placeholder='Grant Name'
            bsSize='sm'
            value={this.state.grantName}
            onChange={this.updateStateValue}
            onKeyDown={this.checkEnter}
          />
        </FormGroup>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0 col'>
          <Input
            type='date'
            max='2999-12-31'
            name='startDate'
            id='startDate'
            placeholder='Start Date'
            bsSize='sm'
            value={this.state.startDate}
            onChange={this.updateStateValue}
            onKeyDown={this.checkEnter}
          />
        </FormGroup>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0 col'>
          <Input
            type='date'
            max='2999-12-31'
            name='endDate'
            id='endDate'
            placeholder='End Date'
            bsSize='sm'
            value={this.state.endDate}
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
)(Form);
