import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardText, CardTitle } from 'reactstrap';
import * as actions from './redux/actions';

export class GrantsLog extends Component {
  static propTypes = {
    grantsFeed: PropTypes.array
  };

  render() {

    const dummyData = [
      {GrantName: 'KC Something', ClientName: 'Billy Joseph Peter', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'},
      {GrantName: 'KC Something', ClientName: 'Billy Joe', TotalSpent: '$500'}
    ];

    return (
      <div className='grants-log'>
        <h4>Recent Transactions</h4>
        <div className='grants-log__listing'>
          {dummyData.map((item) => {
            return (
              <Card body className='grants-log__card'>
                <CardTitle>{item.GrantName}</CardTitle>
                <CardText>{`${item.ClientName} - ${item.TotalSpent}`}</CardText>
              </Card>
            );
          })}
        </div>
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
)(GrantsLog);
