import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';
import * as actions from './redux/actions';
import history from '../../common/history';

export class Table extends Component {
  static propTypes = {
    clients: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.renderResults = this.renderResults.bind(this);
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
              onClick={() => { history.push(`/clients/${searchResult.client_id}`); }}
            >
              <td>{searchResult.Fname}</td>
              <td>{searchResult.Lname}</td>
              <td>{searchResult.birth_date}</td>
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
