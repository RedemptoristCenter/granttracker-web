import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CLIENTS_REQUEST_CLIENT_HOUSEHOLD_BEGIN,
  CLIENTS_REQUEST_CLIENT_HOUSEHOLD_SUCCESS,
  CLIENTS_REQUEST_CLIENT_HOUSEHOLD_FAILURE,
  CLIENTS_REQUEST_CLIENT_HOUSEHOLD_DISMISS_ERROR,
} from 'src/features/clients/redux/constants';

import {
  requestClientHousehold,
  dismissRequestClientHouseholdError,
  reducer,
} from 'src/features/clients/redux/requestClientHousehold';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clients/redux/requestClientHousehold', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestClientHousehold succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestClientHousehold())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_CLIENT_HOUSEHOLD_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_CLIENT_HOUSEHOLD_SUCCESS);
      });
  });

  it('dispatches failure action when requestClientHousehold fails', () => {
    const store = mockStore({});

    return store.dispatch(requestClientHousehold({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_CLIENT_HOUSEHOLD_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_CLIENT_HOUSEHOLD_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestClientHouseholdError', () => {
    const expectedAction = {
      type: CLIENTS_REQUEST_CLIENT_HOUSEHOLD_DISMISS_ERROR,
    };
    expect(dismissRequestClientHouseholdError()).to.deep.equal(expectedAction);
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_HOUSEHOLD_BEGIN correctly', () => {
    const prevState = { requestClientHouseholdPending: false };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_HOUSEHOLD_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientHouseholdPending).to.be.true;
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_HOUSEHOLD_SUCCESS correctly', () => {
    const prevState = { requestClientHouseholdPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_HOUSEHOLD_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientHouseholdPending).to.be.false;
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_HOUSEHOLD_FAILURE correctly', () => {
    const prevState = { requestClientHouseholdPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_HOUSEHOLD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientHouseholdPending).to.be.false;
    expect(state.requestClientHouseholdError).to.exist;
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_HOUSEHOLD_DISMISS_ERROR correctly', () => {
    const prevState = { requestClientHouseholdError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_HOUSEHOLD_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientHouseholdError).to.be.null;
  });
});
