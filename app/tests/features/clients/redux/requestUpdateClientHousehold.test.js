import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_BEGIN,
  CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_SUCCESS,
  CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_FAILURE,
  CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_DISMISS_ERROR,
} from 'src/features/clients/redux/constants';

import {
  requestUpdateClientHousehold,
  dismissRequestUpdateClientHouseholdError,
  reducer,
} from 'src/features/clients/redux/requestUpdateClientHousehold';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clients/redux/requestUpdateClientHousehold', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestUpdateClientHousehold succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestUpdateClientHousehold())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_SUCCESS);
      });
  });

  it('dispatches failure action when requestUpdateClientHousehold fails', () => {
    const store = mockStore({});

    return store.dispatch(requestUpdateClientHousehold({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestUpdateClientHouseholdError', () => {
    const expectedAction = {
      type: CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_DISMISS_ERROR,
    };
    expect(dismissRequestUpdateClientHouseholdError()).to.deep.equal(expectedAction);
  });

  it('handles action type CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_BEGIN correctly', () => {
    const prevState = { requestUpdateClientHouseholdPending: false };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestUpdateClientHouseholdPending).to.be.true;
  });

  it('handles action type CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_SUCCESS correctly', () => {
    const prevState = { requestUpdateClientHouseholdPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestUpdateClientHouseholdPending).to.be.false;
  });

  it('handles action type CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_FAILURE correctly', () => {
    const prevState = { requestUpdateClientHouseholdPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestUpdateClientHouseholdPending).to.be.false;
    expect(state.requestUpdateClientHouseholdError).to.exist;
  });

  it('handles action type CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_DISMISS_ERROR correctly', () => {
    const prevState = { requestUpdateClientHouseholdError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_UPDATE_CLIENT_HOUSEHOLD_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestUpdateClientHouseholdError).to.be.null;
  });
});
