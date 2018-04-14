import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CLIENTS_REQUEST_CLIENT_BY_ID_BEGIN,
  CLIENTS_REQUEST_CLIENT_BY_ID_SUCCESS,
  CLIENTS_REQUEST_CLIENT_BY_ID_FAILURE,
  CLIENTS_REQUEST_CLIENT_BY_ID_DISMISS_ERROR,
} from 'src/features/clients/redux/constants';

import {
  requestClientById,
  dismissRequestClientByIdError,
  reducer,
} from 'src/features/clients/redux/requestClientById';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clients/redux/requestClientById', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestClientById succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestClientById())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_CLIENT_BY_ID_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_CLIENT_BY_ID_SUCCESS);
      });
  });

  it('dispatches failure action when requestClientById fails', () => {
    const store = mockStore({});

    return store.dispatch(requestClientById({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_CLIENT_BY_ID_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_CLIENT_BY_ID_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestClientByIdError', () => {
    const expectedAction = {
      type: CLIENTS_REQUEST_CLIENT_BY_ID_DISMISS_ERROR,
    };
    expect(dismissRequestClientByIdError()).to.deep.equal(expectedAction);
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_BY_ID_BEGIN correctly', () => {
    const prevState = { requestClientByIdPending: false };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_BY_ID_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientByIdPending).to.be.true;
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_BY_ID_SUCCESS correctly', () => {
    const prevState = { requestClientByIdPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_BY_ID_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientByIdPending).to.be.false;
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_BY_ID_FAILURE correctly', () => {
    const prevState = { requestClientByIdPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_BY_ID_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientByIdPending).to.be.false;
    expect(state.requestClientByIdError).to.exist;
  });

  it('handles action type CLIENTS_REQUEST_CLIENT_BY_ID_DISMISS_ERROR correctly', () => {
    const prevState = { requestClientByIdError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CLIENT_BY_ID_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestClientByIdError).to.be.null;
  });
});
