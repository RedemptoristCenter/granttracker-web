import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from '../../features/app';
import * as actions from './redux/actions';
import moment from 'moment/moment';

export class Detail extends Component {
  static propTypes = {
    reports: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { grant_id } = this.props.match.params;
    this.props.actions.requestGrantReport({ grant_id });
    this.props.actions.requestCodeset();
  }

  renderGrantReport() {
    const { grantReport, grantTrans } = this.props.reports;

    return (
      <div>
        {
          grantReport ?
            <div>
              <h2>{grantReport.grantInfo.grant_name}</h2>
              <div className='row'>
                <div className='col'><strong>Initial Amount:</strong> ${grantReport.grantInfo.initial_amount}</div>
                <div className='col'><strong>Current Amount:</strong> ${grantReport.grantInfo.remaining_amount}</div>
              </div>
              <div className='row mt-3'>
                <div className='col'><strong>Start Date:</strong> {moment.unix(grantReport.grantInfo.start_dt_tm).format('MM/DD/YYYY')}</div>
                <div className='col'><strong>End Date:</strong> {moment.unix(grantReport.grantInfo.start_dt_tm).format('MM/DD/YYYY')}</div>
              </div>
            </div>
            :
            ''
        }
        <table className='table table-hover table-striped mt-3'>
          <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Gender</th>
            <th>Race</th>
            <th>Disability</th>
          </tr>
          </thead>
          <tbody>
          {
            grantTrans.map(tran => (
              <tr key={`transaction-report-${tran.id}`}>
                <td>{tran.Fname} {tran.Lname}</td>
                <td>${tran.amount}</td>
                <td>{tran.city}</td>
                <td>{tran.state}</td>
                <td>{tran.zipcode}</td>
                <td>
                  {
                    this.props.reports.GENDER.length > 0 && tran.gender_cd ?
                      this.props.reports.GENDER.find(gender => gender.id === tran.gender_cd).name || '?'
                      :
                      ''
                  }
                </td>
                <td>
                  {
                    this.props.reports.RACE.length > 0 && tran.race_cd ?
                      this.props.reports.RACE.find(race => race.id === tran.race_cd).name || '?'
                      :
                      ''
                  }
                </td>
                <td>
                  {
                    this.props.reports.DISABILITY.length > 0 && tran.disability_cd ?
                      this.props.reports.DISABILITY.find(disability => disability.id === tran.disability_cd).name || '?'
                      :
                      ''
                  }
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <Container title='Report Detail'>
        <div className='reports-detail'>
          {
            this.props.reports.requestGrantReportPending ? 'Loading...' : this.renderGrantReport()
          }
        </div>
      </Container>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    reports: state.reports,
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
)(Detail);
