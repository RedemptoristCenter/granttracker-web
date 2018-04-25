import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ErrorAlert from '../common/ErrorAlert';
import history from '../../common/history';

import * as actions from './redux/actions';

export class Login extends Component {
  static propTypes = {
    login: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      user_name: '',
      user_pass: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="login-login">
        <div className="login-login__signIn">
          <Form>
            <FormGroup row>
              <Col sm={12}>
                <Input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Username"
                  bsSize="lg"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={12}>
                <Input
                  type="password"
                  name="user_pass"
                  id="user_pass"
                  placeholder="Password"
                  bsSize="lg"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
          </Form>
          <Button
            className="login-login__signIn__button"
            color="side-nav"
            onClick={() => {
              if (!!this.state.user_name && !!this.state.user_pass) {
                this.props.actions
                  .login({ user_name: this.state.user_name, user_pass: this.state.user_pass })
                  .then(() => {
                    !this.props.actions.loginError ? history.push('/grants') : '';
                  });
              }
            }}
          >
            Sign In
          </Button>
          {this.props.login.loginError ? <ErrorAlert custom={'Invalid Username or Password'} /> : ''}
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
