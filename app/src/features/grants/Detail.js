import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from '../../features/app';
import { Button, FormGroup, Label, Input, Col } from 'reactstrap';
import MaskedInput from 'react-text-mask';
import moment from 'moment/moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import FormValidator from '../.././features/common/FormValidator';
import { GrantsLog } from './';
import * as actions from './redux/actions';
import history from '../../common/history';


export class Detail extends Component {
  static propTypes = {
    grants: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    }

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.toggleError = this.toggleError.bind(this);
  }

  componentDidMount() {
    const { grant_id } = this.props.match.params;

    if (grant_id === 'new') { this.props.actions.createLocalDefaultGrant(); return true; }
    this.props.actions.requestGrantById({ grant_id });

    return true;
  }

  toggleError() {
    console.log("toggled error!")
    this.setState({
      hasError: true
    });
  }

  handleChangeEvent(e) {
    const { name, value } = e.target;
    this.props.actions.updateLocalGrantInfo(name, value);
  }

  handleStartDateChange(date) {
    this.props.actions.updateLocalGrantInfo('start_dt_tm', moment(date.target.value).unix());
  }

  handleEndDateChange(date) {
    this.props.actions.updateLocalGrantInfo('end_dt_tm', moment(date.target.value).unix());
  }

  renderGrantInfo() {
    const { grantInfo } = this.props.grants;
    const numberMask = createNumberMask({
      prefix: '$',
      suffix: '' // This will put the dollar sign at the end, with a space.
    });

    if (!grantInfo) { return ''; }

    return ([
      <div key='GrantsForm' className='grants-detail__form-wrapper'>
        <Col className='grants-detail__max-height' xs='9'>
          <div className='row justify-content-between align-items-center m-0'>
            <h2>
              <span className='clients-detail__back-arrow' onClick={() => { history.push('/grants'); }}><i className='fas fa-arrow-left' /></span>
              &nbsp;&nbsp;&nbsp;{grantInfo.grant_name}
            </h2>
            <Button size='sm' className='col-3' color='primary' onClick={() => { !grantInfo.grant_id? this.props.actions.createGrant({ grantInfo }).then(history.push('/grants')) : this.props.actions.updateGrant({ grantInfo }).then(history.push('/grants'));  }}>Save</Button>
          </div>
          <br />
        
          <div>
            <FormGroup className='col'>
              <FormValidator value={grantInfo.grant_name} errorCallback={this.toggleError}>
                <Label for='grant_name'>Grant Name</Label>
                <Input type='text' name='grant_name' id='grant_name' value={grantInfo.grant_name || ''} onChange={this.handleChangeEvent} />
              </FormValidator>  
            </FormGroup>
            <FormGroup className='col'>
              <FormValidator errorCallback={this.toggleError} value={moment.unix(grantInfo.start_dt_tm).format("YYYY-MM-DD")}>
                <Label for='start_dt_tm'>Grant Start Date</Label>
                <Input
                  type='date'
                  max='2999-12-31'
                  name='start_dt_tm'
                  id='start_dt_tm'
                  placeholder='Grant Start Date'
                  bsSize='sm'
                  value={moment.unix(grantInfo.start_dt_tm).format("YYYY-MM-DD")}
                  onChange={this.handleStartDateChange}
                />
              </FormValidator>
            </FormGroup>
            <FormGroup className='col'>
              <FormValidator errorCallback={this.toggleError} value={moment.unix(grantInfo.end_dt_tm).format("YYYY-MM-DD")}>
                <Label for='end_dt_tm'>Grant End Date</Label>
                <Input
                  type='date'
                  max='2999-12-31'
                  name='end_dt_tm'
                  id='end_dt_tm'
                  placeholder='Grant End Date'
                  bsSize='sm'
                  value={moment.unix(grantInfo.end_dt_tm).format("YYYY-MM-DD")}
                  onChange={this.handleEndDateChange}
                />
              </FormValidator>
            </FormGroup>
            <FormGroup className='col'>
              <FormValidator errorCallback={this.toggleError} value={grantInfo.initial_amount}>
                <Label for='initial_amount'>Initial Amount</Label>
                <MaskedInput
                  mask={numberMask}
                  className="form-control"
                  placeholder=''
                  guide={false}
                  id='initial_amount'
                  name='initial_amount'
                  value={grantInfo.initial_amount || ''}
                  onChange={this.handleChangeEvent}
                />
              </FormValidator>
            </FormGroup>
            <FormGroup className='col'>
              <FormValidator errorCallback={this.toggleError} value={grantInfo.remaining_amount}>
                <Label for='remaining_amount'>Remaining Amount</Label>
                <MaskedInput
                  mask={numberMask}
                  className="form-control"
                  placeholder=''
                  guide={false}
                  id='remaining_amount'
                  name='remaining_amount'
                  value={grantInfo.remaining_amount || ''}
                  onChange={this.handleChangeEvent}
                />
              </FormValidator>
            </FormGroup>
          </div>
        </Col>
        <GrantsLog key='grantsLog' grantInfo={grantInfo} />
      </div>
    ]);
  }

  render() {
    return (
      <Container title='Grants'>
        <div className='grants-detail'>
          {this.props.grants.requestGrantByIdPending ? 'Loading...' : this.renderGrantInfo()}
        </div>
      </Container>
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
)(Detail);
