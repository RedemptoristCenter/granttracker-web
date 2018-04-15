import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Label, Input, Button, Card } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import * as modalActions from '../../features/modals/redux/actions';
import * as actions from './redux/actions';
import history from '../../common/history';

export class TabHousehold extends Component {
  static propTypes = {
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    modalActions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.renderHouseholdNonsense = this.renderHouseholdNonsense.bind(this);
  }

  handleChangeEvent(e) {
    const { name, value } = e.target;
    this.props.actions.updateLocalClientInfo(name, parseInt(value));
  }

  renderHouseholdNonsense() {
    const { household } = this.props.clients;
    return (
      <div>
        <Button onClick={() => { this.props.modalActions.openModal('ClientSearchModal', 'lg'); }} color='link' className='float-right'>+ Find Client</Button>
        <div className='mt-3'>
          <h3>Additional Household Members</h3>
        </div>
        <hr className='mt-0 mb-3' />
        {
          household.map(client => (
            <Card key={`household-client-${client.client_id}`} className='mt-3 border-dark'>
              <div className='row justify-content-start align-items-center'>
                <div className='col'><strong>Name:</strong> {client.Fname} {client.Mname} {client.Lname}</div>
                <div className='col'><strong>DOB:</strong> {moment.unix(client.birth_date).format('YYYY-MM-DD')}</div>
                <div className='col'>
                  <strong>Rel to HoH:</strong>&nbsp;
                  {
                      this.props.clients.RELTN_TO_HOH.length > 0 && client.reltn_to_hoh_cd ?
                        this.props.clients.RELTN_TO_HOH.find(ssn => ssn.id === client.reltn_to_hoh_cd).name || '?'
                        :
                        ''
                    }
                </div>
              </div>
              <div className='row justify-content-start align-items-center mt-2'>
                <div className='col'>
                  <strong>SSN:</strong>&nbsp;
                  {
                      this.props.clients.SSN.length > 0 && client.ssn_cd ?
                        this.props.clients.SSN.find(ssn => ssn.id === client.ssn_cd).name || '?'
                        :
                        ''
                    }
                </div>
                <div className='col'>
                  <strong>Gender:</strong>&nbsp;
                  { this.props.clients.GENDER.length > 0 ? this.props.clients.GENDER.find(gender => gender.id === client.gender_cd).name || '?' : '' }
                </div>
              </div>
              <hr />
              <div className='row ml-0 mr-0 mt-2 justify-content-end'>
                <Button color='primary' outline size='sm' onClick={() => history.push(`/clients/${client.client_id}`)}>Update Client Info</Button>
                  &nbsp;&nbsp;
                <Button color='danger' outline size='sm' onClick={() => { this.props.actions.updateLocalHouseholdRemoveClient(client.client_id); }}>Remove from List</Button>
              </div>
            </Card>
          ))
        }
      </div>
    );
  }

  render() {
    const { clientInfo } = this.props.clients;
    if (!clientInfo) { return ''; }
    const currentRelationship = this.props.clients.RELTN_TO_HOH.find(rel => rel.id === clientInfo.reltn_to_hoh_cd);

    return (
      <div className='clients-tab-household mt-4'>
        <div className='row align-items-center'>
          <div className='col-12'>
            <Label for='family_type_cd'>Family Type</Label>
            <Input type='select' name='family_type_cd' id='family_type_cd' value={clientInfo.family_type_cd} onChange={this.handleChangeEvent}>
              {
                this.props.clients.FAMILY_TYPE.map(family_type => <option key={`family_type-option-${family_type.id}`} value={family_type.id}>{family_type.name}</option>)
              }
            </Input>
          </div>
          <div className='col-12 mt-3'>
            <Input type='select' name='reltn_to_hoh_cd' id='reltn_to_hoh_cd' value={clientInfo.reltn_to_hoh_cd} onChange={this.handleChangeEvent}>
              {
                this.props.clients.RELTN_TO_HOH.map(relation => <option key={`relation-option-${relation.id}`} value={relation.id}>{relation.name}</option>)
              }
            </Input>
            {
              clientInfo.reltn_to_hoh_cd !== 17 ?
                <div className='text-right'>
                  {
                    clientInfo.hoh ?
                      <a href='#' onClick={(e) => { e.preventDefault(); return history.push(`/clients/${clientInfo.hoh.client_id}`); }}>of {clientInfo.hoh.Fname} {clientInfo.hoh.Lname}</a>
                      :
                      ''
                  }
                </div>
                :
                this.renderHouseholdNonsense()
            }
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
    modals: state.modals
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    modalActions: bindActionCreators({ ...modalActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHousehold);
