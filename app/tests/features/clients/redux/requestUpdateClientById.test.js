import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_BEGIN,
  CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_SUCCESS,
  CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_FAILURE,
  CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_DISMISS_ERROR,
} from 'src/features/clients/redux/constants';

import {
  requestUpdateClientById,
  dismissRequestUpdateClientByIdError,
  reducer,
} from 'src/features/clients/redux/requestUpdateClientById';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clients/redux/requestUpdateClientById', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestUpdateClientById succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestUpdateClientById())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_SUCCESS);
      });
  });

  it('dispatches failure action when requestUpdateClientById fails', () => {
    const store = mockStore({});

    return store.dispatch(requestUpdateClientById({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestUpdateClientByIdError', () => {
    const expectedAction = {
      type: CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_DISMISS_ERROR,
    };
    expect(dismissRequestUpdateClientByIdError()).to.deep.equal(expectedAction);
  });

  it('handles action type CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_BEGIN correctly', () => {
    const prevState = { requestUpdateClientByIdPending: false };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestUpdateClientByIdPending).to.be.true;
  });

  it('handles action type CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_SUCCESS correctly', () => {
    const prevState = { requestUpdateClientByIdPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestUpdateClientByIdPending).to.be.false;
  });

  it('handles action type CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_FAILURE correctly', () => {
    const prevState = { requestUpdateClientByIdPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestUpdateClientByIdPending).to.be.false;
    expect(state.requestUpdateClientByIdError).to.exist;
  });

  it('handles action type CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_DISMISS_ERROR correctly', () => {
    const prevState = { requestUpdateClientByIdError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestUpdateClientByIdError).to.be.null;
  });
});
