import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from './redux/actions';

export class Consent extends Component {
  static propTypes = {
    clientPdf: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  state = {
    name: ''
  };

  componentWillMount() {
    const params = queryString.parse(this.props.location.search);
    this.setState({
      name: `${params.Fname} ${params.Lname}`
    });
  }

  render() {
    const today = moment().format('YYYY-MM-DD');

    return (
      <div className='client-pdf-consent'>
        <div className='client-pdf-consent__actions'>
          <Button size='sm' color='primary' onClick={() => window.print()}>Save or Print</Button>
        </div>
        <div className='client-pdf-consent__pdf'>
          <div className='client-pdf-consent__agency-name'>Redemptorist Services</div>
          <div className='client-pdf-consent__name'>{this.state.name}</div>
          <div className='client-pdf-consent__client-date'>{today}</div>
          <div className='client-pdf-consent__rep-date'>{today}</div>
          <div className='client-pdf-consent__background'>
            <img src='https://i.imgur.com/Y5hZF5k.jpg' width='1080' height='100%' />
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    clientPdf: state.clientPdf,
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
)(Consent);
