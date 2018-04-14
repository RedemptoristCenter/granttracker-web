import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from '../../features/app';
import { Button } from 'reactstrap';
import * as actions from './redux/actions';
import history from '../../common/history';

export class Detail extends Component {
  static propTypes = {
    grants: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { grant_id } = this.props.match.params;
    this.props.actions.requestGrantById({ grant_id });
  }

  renderGrantInfo() {
    const { grantInfo } = this.props.grants;
    console.log(grantInfo)
    if (!grantInfo) { return ''; }

    return (
      <div>
        <div className='row justify-content-between align-items-center m-0'>
          <h2>
            <span className='clients-detail__back-arrow' onClick={() => { history.push('/grants'); }}><i className='fas fa-arrow-left' /></span>
            &nbsp;&nbsp;&nbsp;{grantInfo.grant_name}
          </h2>
          <Button size='sm' className='col-3' color='primary' onClick={() => { alert('sup!'); }}>Save</Button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Container title='Grants'>
        <div className='grants-detail'>
          {this.props.grants.requestGrantByIdPending ? 'Loading...' : this.renderGrantInfo()}
        </div>
      </Container>
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
)(Detail);
