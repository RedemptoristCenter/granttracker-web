import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  REPORTS_REQUEST_GRANT_REPORT_BEGIN,
  REPORTS_REQUEST_GRANT_REPORT_SUCCESS,
  REPORTS_REQUEST_GRANT_REPORT_FAILURE,
  REPORTS_REQUEST_GRANT_REPORT_DISMISS_ERROR,
} from 'src/features/reports/redux/constants';

import {
  requestGrantReport,
  dismissRequestGrantReportError,
  reducer,
} from 'src/features/reports/redux/requestGrantReport';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('reports/redux/requestGrantReport', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestGrantReport succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestGrantReport())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', REPORTS_REQUEST_GRANT_REPORT_BEGIN);
        expect(actions[1]).to.have.property('type', REPORTS_REQUEST_GRANT_REPORT_SUCCESS);
      });
  });

  it('dispatches failure action when requestGrantReport fails', () => {
    const store = mockStore({});

    return store.dispatch(requestGrantReport({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', REPORTS_REQUEST_GRANT_REPORT_BEGIN);
        expect(actions[1]).to.have.property('type', REPORTS_REQUEST_GRANT_REPORT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestGrantReportError', () => {
    const expectedAction = {
      type: REPORTS_REQUEST_GRANT_REPORT_DISMISS_ERROR,
    };
    expect(dismissRequestGrantReportError()).to.deep.equal(expectedAction);
  });

  it('handles action type REPORTS_REQUEST_GRANT_REPORT_BEGIN correctly', () => {
    const prevState = { requestGrantReportPending: false };
    const state = reducer(
      prevState,
      { type: REPORTS_REQUEST_GRANT_REPORT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestGrantReportPending).to.be.true;
  });

  it('handles action type REPORTS_REQUEST_GRANT_REPORT_SUCCESS correctly', () => {
    const prevState = { requestGrantReportPending: true };
    const state = reducer(
      prevState,
      { type: REPORTS_REQUEST_GRANT_REPORT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestGrantReportPending).to.be.false;
  });

  it('handles action type REPORTS_REQUEST_GRANT_REPORT_FAILURE correctly', () => {
    const prevState = { requestGrantReportPending: true };
    const state = reducer(
      prevState,
      { type: REPORTS_REQUEST_GRANT_REPORT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestGrantReportPending).to.be.false;
    expect(state.requestGrantReportError).to.exist;
  });

  it('handles action type REPORTS_REQUEST_GRANT_REPORT_DISMISS_ERROR correctly', () => {
    const prevState = { requestGrantReportError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: REPORTS_REQUEST_GRANT_REPORT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestGrantReportError).to.be.null;
  });
});
