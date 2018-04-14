import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CLIENTS_REQUEST_CODESET_BEGIN,
  CLIENTS_REQUEST_CODESET_SUCCESS,
  CLIENTS_REQUEST_CODESET_FAILURE,
  CLIENTS_REQUEST_CODESET_DISMISS_ERROR,
} from 'src/features/clients/redux/constants';

import {
  requestCodeset,
  dismissRequestCodesetError,
  reducer,
} from 'src/features/clients/redux/requestCodeset';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clients/redux/requestCodeset', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestCodeset succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestCodeset())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_CODESET_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_CODESET_SUCCESS);
      });
  });

  it('dispatches failure action when requestCodeset fails', () => {
    const store = mockStore({});

    return store.dispatch(requestCodeset({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CLIENTS_REQUEST_CODESET_BEGIN);
        expect(actions[1]).to.have.property('type', CLIENTS_REQUEST_CODESET_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestCodesetError', () => {
    const expectedAction = {
      type: CLIENTS_REQUEST_CODESET_DISMISS_ERROR,
    };
    expect(dismissRequestCodesetError()).to.deep.equal(expectedAction);
  });

  it('handles action type CLIENTS_REQUEST_CODESET_BEGIN correctly', () => {
    const prevState = { requestCodesetPending: false };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CODESET_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCodesetPending).to.be.true;
  });

  it('handles action type CLIENTS_REQUEST_CODESET_SUCCESS correctly', () => {
    const prevState = { requestCodesetPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CODESET_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCodesetPending).to.be.false;
  });

  it('handles action type CLIENTS_REQUEST_CODESET_FAILURE correctly', () => {
    const prevState = { requestCodesetPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CODESET_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCodesetPending).to.be.false;
    expect(state.requestCodesetError).to.exist;
  });

  it('handles action type CLIENTS_REQUEST_CODESET_DISMISS_ERROR correctly', () => {
    const prevState = { requestCodesetError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTS_REQUEST_CODESET_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCodesetError).to.be.null;
  });
});
