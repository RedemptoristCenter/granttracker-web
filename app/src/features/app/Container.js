import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, Col, Card } from 'reactstrap';

export default class Container extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className='app-container row align-items-stretch justify-content-around m-0'>
        <Col xs='1' className='nav-bar__left'>
          <img className='nav-logo' src={require('../../images/logo-mark.svg')} />
          <Nav vertical className='nav-bar__icons'>
            <NavItem>
              <NavLink href='#'><i className='fas fa-users' /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#'><i className='fas fa-hand-holding-usd' /></NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col className='p-0'>
          <div className='nav-bar__top'><h2 className='mb-0'>{this.props.title}</h2></div>
          <div className='app-container__content-area'>
            <Card>
              {this.props.children}
            </Card>
          </div>
        </Col>
      </div>
    );
  }
}
