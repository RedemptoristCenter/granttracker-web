import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CLIENTS_REQUEST_CLIENT_RECORDS_BEGIN,
  CLIENTS_REQUEST_CLIENT_RECORDS_SUCCESS,
  CLIENTS_REQUEST_CLIENT_RECORDS_FAILURE,
  CLIENTS_REQUEST_CLIENT_RECORDS_DISMISS_ERROR,
} from 'src/features/clients/redux/constants';

import {
  requestClientRecords,
  dismissRequestClientRecordsError,
  reducer,
} from 'src/features/clients/redux/requestClientRecords';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clients/redux/requestClientRecords', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestClientRecords succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestClientRecords())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_CLIENT_RECORDS_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_CLIENT_RECORDS_SUCCESS);
      });
  });

  it('dispatches failure action when requestClientRecords fails', () => {
    const store = mockStore({});

    return store.dispatch(requestClientRecords({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_CLIENT_RECORDS_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_CLIENT_RECORDS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestClientRecordsError', () => {
    const expectedAction = {
      type: CLIENTS_REQUEST_CLIENT_RECORDS_DISMISS_ERROR,
    };
    expect(dismissRequestClientRecordsError()).to.deep.equal(expectedAction);
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_RECORDS_BEGIN correctly', () => {
    const prevState = { requestClientRecordsPending: false };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_RECORDS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientRecordsPending).to.be.true;
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_RECORDS_SUCCESS correctly', () => {
    const prevState = { requestClientRecordsPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_RECORDS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientRecordsPending).to.be.false;
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_RECORDS_FAILURE correctly', () => {
    const prevState = { requestClientRecordsPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_RECORDS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientRecordsPending).to.be.false;
    expect(state.requestClientRecordsError).to.exist;
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_RECORDS_DISMISS_ERROR correctly', () => {
    const prevState = { requestClientRecordsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_RECORDS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientRecordsError).to.be.null;
  });
});
