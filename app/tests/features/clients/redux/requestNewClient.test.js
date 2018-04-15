import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CLIENTS_REQUEST_NEW_CLIENT_BEGIN,
  CLIENTS_REQUEST_NEW_CLIENT_SUCCESS,
  CLIENTS_REQUEST_NEW_CLIENT_FAILURE,
  CLIENTS_REQUEST_NEW_CLIENT_DISMISS_ERROR,
} from 'src/features/clients/redux/constants';

import {
  requestNewClient,
  dismissRequestNewClientError,
  reducer,
} from 'src/features/clients/redux/requestNewClient';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clients/redux/requestNewClient', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestNewClient succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestNewClient())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_NEW_CLIENT_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_NEW_CLIENT_SUCCESS);
      });
  });

  it('dispatches failure action when requestNewClient fails', () => {
    const store = mockStore({});

    return store.dispatch(requestNewClient({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_NEW_CLIENT_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_NEW_CLIENT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestNewClientError', () => {
    const expectedAction = {
      type: CLIENTS_REQUEST_NEW_CLIENT_DISMISS_ERROR,
    };
    expect(dismissRequestNewClientError()).to.deep.equal(expectedAction);
  });

  it('handles action type CLIENTS_REQUEST_NEW_CLIENT_BEGIN correctly', () => {
    const prevState = { requestNewClientPending: false };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_NEW_CLIENT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestNewClientPending).to.be.true;
  });

  it('handles action type CLIENTS_REQUEST_NEW_CLIENT_SUCCESS correctly', () => {
    const prevState = { requestNewClientPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_NEW_CLIENT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestNewClientPending).to.be.false;
  });

  it('handles action type CLIENTS_REQUEST_NEW_CLIENT_FAILURE correctly', () => {
    const prevState = { requestNewClientPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_NEW_CLIENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestNewClientPending).to.be.false;
    expect(state.requestNewClientError).to.exist;
  });

  it('handles action type CLIENTS_REQUEST_NEW_CLIENT_DISMISS_ERROR correctly', () => {
    const prevState = { requestNewClientError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_NEW_CLIENT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestNewClientError).to.be.null;
  });
});
