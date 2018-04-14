import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TabHousehold extends Component {
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
              clientInfo.reltn_to_hoh_cd !== 17 ? <div className='text-right'>of Foobar McGee</div> : ''
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
)(TabHousehold);
