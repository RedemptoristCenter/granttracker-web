import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import * as actions from './redux/actions';

export class Login extends Component {
  static propTypes = {
    login: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className='login-login'>
        <div className='login-login__signIn'>
          <Form>
            <FormGroup row>
              <Col sm={12}>
                <Input type='email' name='email' id='email' placeholder='Email' bsSize='lg' />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={12}>
                <Input type='password' name='password' id='password' placeholder='Password' bsSize='lg' />
              </Col>
            </FormGroup>
          </Form>
          <Button onClick={()=>{alert('insert log in function here')}} className='login-login__signIn__button' color='side-nav'>Sign In</Button>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    login: state.login,
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
)(Login);
