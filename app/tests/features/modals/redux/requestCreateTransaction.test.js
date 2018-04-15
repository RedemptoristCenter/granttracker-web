import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  MODALS_REQUEST_CREATE_TRANSACTION_BEGIN,
  MODALS_REQUEST_CREATE_TRANSACTION_SUCCESS,
  MODALS_REQUEST_CREATE_TRANSACTION_FAILURE,
  MODALS_REQUEST_CREATE_TRANSACTION_DISMISS_ERROR,
} from 'src/features/modals/redux/constants';

import {
  requestCreateTransaction,
  dismissRequestCreateTransactionError,
  reducer,
} from 'src/features/modals/redux/requestCreateTransaction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('modals/redux/requestCreateTransaction', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestCreateTransaction succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestCreateTransaction())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', MODALS_REQUEST_CREATE_TRANSACTION_BEGIN);
        expect(actions[1]).to.have.property('type', MODALS_REQUEST_CREATE_TRANSACTION_SUCCESS);
      });
  });

  it('dispatches failure action when requestCreateTransaction fails', () => {
    const store = mockStore({});

    return store.dispatch(requestCreateTransaction({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', MODALS_REQUEST_CREATE_TRANSACTION_BEGIN);
        expect(actions[1]).to.have.property('type', MODALS_REQUEST_CREATE_TRANSACTION_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestCreateTransactionError', () => {
    const expectedAction = {
      type: MODALS_REQUEST_CREATE_TRANSACTION_DISMISS_ERROR,
    };
    expect(dismissRequestCreateTransactionError()).to.deep.equal(expectedAction);
  });

  it('handles action type MODALS_REQUEST_CREATE_TRANSACTION_BEGIN correctly', () => {
    const prevState = { requestCreateTransactionPending: false };
    const state = reducer(
      prevState,
      { type: MODALS_REQUEST_CREATE_TRANSACTION_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCreateTransactionPending).to.be.true;
  });

  it('handles action type MODALS_REQUEST_CREATE_TRANSACTION_SUCCESS correctly', () => {
    const prevState = { requestCreateTransactionPending: true };
    const state = reducer(
      prevState,
      { type: MODALS_REQUEST_CREATE_TRANSACTION_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCreateTransactionPending).to.be.false;
  });

  it('handles action type MODALS_REQUEST_CREATE_TRANSACTION_FAILURE correctly', () => {
    const prevState = { requestCreateTransactionPending: true };
    const state = reducer(
      prevState,
      { type: MODALS_REQUEST_CREATE_TRANSACTION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCreateTransactionPending).to.be.false;
    expect(state.requestCreateTransactionError).to.exist;
  });

  it('handles action type MODALS_REQUEST_CREATE_TRANSACTION_DISMISS_ERROR correctly', () => {
    const prevState = { requestCreateTransactionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MODALS_REQUEST_CREATE_TRANSACTION_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCreateTransactionError).to.be.null;
  });
});
