import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, Col, Card, Button } from 'reactstrap';
import history from '../../common/history';

import { DefaultPage as ModalWrapper } from '../../features/modals';

export default class Container extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string.isRequired,
    createButtonLabel: PropTypes.string,
    createButtonFunction: PropTypes.func
  };

  checkActive(navLink) {
    const path = window.location.pathname;
    const check = path.match(navLink);

    if (check) {
      return check.length > 0;
    }

    return false;
  }

  renderActionButton() {
    const { createButtonLabel, createButtonFunction } = this.props;

    return (
      <Button className='col-3' color='success' onClick={createButtonFunction}>{createButtonLabel}</Button>
    );
  }

  render() {
    return [
      <div className='app-container row align-items-stretch justify-content-around m-0' key='app-container'>
        <Col xs='1' className='nav-bar__left'>
          <div>
            <img className='nav-logo' src={require('../../images/logo-mark.svg')} />
            <Nav vertical className='nav-bar__icons'>
              <NavItem>
                <NavLink
                  href='#'
                  onClick={(e) => { e.preventDefault(); history.push('/clients'); }}
                  className={this.checkActive('/clients') ? 'active' : ''}
                >
                  <i className='fas fa-users' />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href='#'
                  onClick={(e) => { e.preventDefault(); history.push('/grants'); }}
                  className={this.checkActive('/grants') ? 'active' : ''}
                >
                  <i className='fas fa-hand-holding-usd' />
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <Nav vertical className='nav-bar__icons'>
            <NavItem>
              <NavLink
                href='#'
                onClick={(e) => { e.preventDefault(); history.push('/logout'); }}
              >
                <i className='fas fa-sign-out-alt' />
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col className='p-0'>
          <div className='nav-bar__top row m-0 align-items-center justify-content-between'>
            <h2 className='mb-0'>{this.props.title}</h2>
            {this.props.createButtonLabel ? this.renderActionButton() : ''}
          </div>
          <div className='app-container__content-area'>
            <Card>
              {this.props.children}
            </Card>
          </div>
        </Col>
      </div>,
      <ModalWrapper key='modal-wrapper' />
    ];
  }
}
