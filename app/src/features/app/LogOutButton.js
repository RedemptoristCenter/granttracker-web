import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from '../../common/history';
import { NavLink, NavItem } from 'reactstrap';
import * as actions from './redux/actions';

export class LogOutButton extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <NavItem>
        <NavLink
          href='#'
          onClick={(e) => { e.preventDefault(); this.props.actions.logout(); history.push('/login'); }}
        >
          <i className='fas fa-sign-out-alt' />
        </NavLink>
      </NavItem>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
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
)(LogOutButton);
