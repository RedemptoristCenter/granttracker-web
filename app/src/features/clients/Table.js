import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';
import * as actions from './redux/actions';
import history from '../../common/history';

export class Table extends Component {
  static propTypes = {
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    customSelect: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.renderResults = this.renderResults.bind(this);
    this.select = this.select.bind(this);
  }

  select(searchResult) {
    if (this.props.customSelect) {
      this.props.customSelect(searchResult);
      return true;
    }

    history.push(`/clients/${searchResult.client_id}`);
    return true;
  }

  renderResults() {
    const { searchResults } = this.props.clients;

    if (this.props.clients.requestSearchPending) {
      return (
        <tbody>
          <tr>
            <td colSpan='3'>
              <Progress bar animated color='success' value='100'>Loading</Progress>
            </td>
          </tr>
        </tbody>
      );
    }

    if (searchResults.length < 1) {
      return (
        <tbody>
          <tr>
            <td colSpan='3'>No results found...</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {
          searchResults.map(searchResult => (
            <tr
              key={`search-result-client-${searchResult.client_id}`}
              onClick={() => { this.select(searchResult); }}
            >
              <td>{searchResult.Fname}</td>
              <td>{searchResult.Lname}</td>
              <td>{moment.unix(searchResult.birth_date).format('MM/DD/YYYY')}</td>
            </tr>
            ))
        }
      </tbody>
    );
  }

  render() {
    return (
      <div className='clients-table mt-3'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birth Date</th>
            </tr>
          </thead>
          {this.renderResults()}
        </table>
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
)(Table);
