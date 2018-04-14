import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import { Container } from '../../features/app';
import { AssistanceLog } from '../../features/common';
import { TabProfile, TabDemographics, TabHousehold, TabIncome } from './';
import * as actions from './redux/actions';
import history from '../../common/history';

export class Detail extends Component {
  static propTypes = {
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  state = {
    activeTab: '1'
  };

  componentDidMount() {
    const { client_id } = this.props.match.params;
    this.props.actions.requestCodeset();

    if (client_id === 'new') { this.props.actions.createLocalDefaultClient(); return true; }
    this.props.actions.requestClientById({ client_id });

    console.log('client_id', client_id);
    return true;
  }

  componentWillUnmount() {
    console.log('unmounting');
    this.props.actions.resetLocalClientInfo();
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  renderClientInfo() {
    const { clientInfo } = this.props.clients;
    console.log(clientInfo);
    if (!clientInfo) { return ''; }

    return (
      <div>
        <div className='row justify-content-between align-items-center m-0'>
          <h2>
            <span className='clients-detail__back-arrow' onClick={() => { history.push('/clients'); }}><i className='fas fa-arrow-left' /></span>
            &nbsp;&nbsp;&nbsp;{clientInfo.Fname} {clientInfo.Lname}
          </h2>
          <Button size='sm' className='col-3' color='primary' onClick={() => { alert('sup!'); }}>Save</Button>
        </div>
        <hr />
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Demographics
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                Household
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => { this.toggle('4'); }}
              >
                Income (?)
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId='1'>
              <TabProfile />
            </TabPane>
            <TabPane tabId='2'>
              <TabDemographics />
            </TabPane>
            <TabPane tabId='3'>
              <TabHousehold />
            </TabPane>
            <TabPane tabId='4'>
              <TabIncome />
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Container title='Clients'>
        <div className='clients-detail row justify-content-between align-items-stretch'>
          <div className='col'>
            {this.props.clients.requestClientByIdPending ? 'Loading...' : this.renderClientInfo()}
          </div>
          <AssistanceLog className='col-3' name='Assistance Log' data={[]} />
        </div>
      </Container>
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
