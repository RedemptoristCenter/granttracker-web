import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';
import moment from 'moment/moment';
import accounting from 'accounting';
import history from '../../common/history';
import * as actions from './redux/actions';

export class Table extends Component {
  static propTypes = {
    grants: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.renderResults = this.renderResults.bind(this);
  }

  renderResults() {
    const { searchResults } = this.props.grants;

    if (this.props.grants.requestSearchPending) {
      return (
        <tbody>
          <tr>
            <td colSpan='6'>
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
            <td colSpan='6'>No results found...</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {
        searchResults.map(searchResult => (
          <tr key={`search-result-grant-${searchResult.grant_id}`}
          onClick={() => { history.push(`/grants/${searchResult.grant_id}`); }}
          >
            <td>{searchResult.grant_name}</td>
            <td>{accounting.formatMoney(searchResult.initial_amount)}</td>
            <td>{accounting.formatMoney(searchResult.remaining_amount)}</td>
            <td>{moment.unix(searchResult.start_dt_tm).format('MM/DD/YYYY')}</td>
            <td>{moment.unix(searchResult.end_dt_tm).format('MM/DD/YYYY')}</td>
          </tr>
        ))
      }
      </tbody>
    );
  }

  render() {
    return (
      <div className='grants-table mt-3'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Grant Name</th>
              <th>Initial Amount</th>
              <th>Remaining Amount</th>
              <th>Start Date</th>
              <th>End Date</th>
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
    grants: state.grants,
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
