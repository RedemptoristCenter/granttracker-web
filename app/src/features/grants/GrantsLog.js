import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import accounting from 'accounting';
import { Card, CardTitle, CardText } from 'reactstrap';
import * as actions from './redux/actions';

export class GrantsLog extends Component {
  static propTypes = {
    grants: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };


  constructor(props) {
    super(props);

    this.renderGrantLog = this.renderGrantLog.bind(this);
  }

  state = {

  }

  componentWillMount() {
    this.props.actions.getGrantLog({ grant_id: this.props.grantInfo.grant_id });
  }

  renderGrantLog() {
    return (
      <div>
        {
          this.props.grants.grantFeed.map((item) => {
            return (
              <Card body className='grants-grants-log__card'>
                <CardTitle>{item.grant_name}</CardTitle>
                <CardText>{`${item.Fname} ${item.Lname} - ${accounting.formatMoney(item.Trans_amount)}`}</CardText>
              </Card>
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className='grants-grants-log'>
        <h4>Recent Transactions</h4>
        {this.renderGrantLog()}
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
