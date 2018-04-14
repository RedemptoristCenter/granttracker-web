import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TabDemographics extends Component {
  static propTypes = {
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  handleChangeEvent(e) {
    const { name, value } = e.target;
    this.props.actions.updateLocalClientInfo(name, parseInt(value));
  }

  render() {
    const { clientInfo } = this.props.clients;
    return (
      <div className='clients-tab-demographics mt-4'>
        <div className='row'>
          <div className='col'>
            <Label for='gender_cd'>Gender</Label>
            <Input type='select' name='gender_cd' id='gender_cd' value={clientInfo.gender_cd} onChange={this.handleChangeEvent}>
              {
                this.props.clients.GENDER.map(gender => <option key={`gender-option-${gender.id}`} value={gender.id}>{gender.name}</option>)
              }
            </Input>
          </div>
          <div className='col'>
            <Label for='ethnicity_cd'>Ethnicity</Label>
            <Input type='select' name='ethnicity_cd' id='ethnicity_cd' value={clientInfo.ethnicity_cd} onChange={this.handleChangeEvent}>
              {
                this.props.clients.ETHNICITY.map(ethnicity => <option key={`ethnicity-option-${ethnicity.id}`} value={ethnicity.id}>{ethnicity.name}</option>)
              }
            </Input>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col'>
            <Label for='race_cd'>Race</Label>
            <Input type='select' name='race_cd' id='race_cd' value={clientInfo.race_cd} onChange={this.handleChangeEvent}>
              {
                this.props.clients.RACE.map(race => <option key={`race-option-${race.id}`} value={race.id}>{race.name}</option>)
              }
            </Input>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col'>
            <Label for='veteran_cd'>Veteran Status</Label>
            <Input type='select' name='veteran_cd' id='veteran_cd' value={clientInfo.veteran_cd} onChange={this.handleChangeEvent}>
              {
                this.props.clients.VETERAN.map(veteran => <option key={`veteran-option-${veteran.id}`} value={veteran.id}>{veteran.name}</option>)
              }
            </Input>
          </div>
          <div className='col'>
            <Label for='disability_cd'>Disabling Condition</Label>
            <Input type='select' name='disability_cd' id='disability_cd' value={clientInfo.disability_cd} onChange={this.handleChangeEvent}>
              {
                this.props.clients.DISABILITY.map(disability => <option key={`disability-option-${disability.id}`} value={disability.id}>{disability.name}</option>)
              }
            </Input>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col'>
            <Label for='housing_cd'>Housing Status</Label>
            <Input type='select' name='housing_cd' id='housing_cd' value={clientInfo.housing_cd} onChange={this.handleChangeEvent}>
              {
                this.props.clients.HOUSING.map(housing => <option key={`housing-option-${housing.id}`} value={housing.id}>{housing.name}</option>)
              }
            </Input>
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
)(TabDemographics);
