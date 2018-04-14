import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Col } from 'reactstrap';

export default class Container extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="app-container">
        <Col xs="1" className='nav-bar__left'>
          <img className="nav-logo" src={require('../../images/logo-mark.svg')} />
          <Nav vertical>
            <NavItem>
              <NavLink href="#"><i className="fas fa-users"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#"><i className="fas fa-hand-holding-usd"></i></NavLink>
            </NavItem>
          </Nav>
        </Col>
      </div>
    );
  }
}
