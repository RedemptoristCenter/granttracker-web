import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  MODALS_REQUEST_CURRENT_GRANTS_BEGIN,
  MODALS_REQUEST_CURRENT_GRANTS_SUCCESS,
  MODALS_REQUEST_CURRENT_GRANTS_FAILURE,
  MODALS_REQUEST_CURRENT_GRANTS_DISMISS_ERROR,
} from 'src/features/modals/redux/constants';

import {
  requestCurrentGrants,
  dismissRequestCurrentGrantsError,
  reducer,
} from 'src/features/modals/redux/requestCurrentGrants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('modals/redux/requestCurrentGrants', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestCurrentGrants succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestCurrentGrants())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', MODALS_REQUEST_CURRENT_GRANTS_BEGIN);
        expect(actions[1]).to.have.property('type', MODALS_REQUEST_CURRENT_GRANTS_SUCCESS);
      });
  });

  it('dispatches failure action when requestCurrentGrants fails', () => {
    const store = mockStore({});

    return store.dispatch(requestCurrentGrants({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', MODALS_REQUEST_CURRENT_GRANTS_BEGIN);
        expect(actions[1]).to.have.property('type', MODALS_REQUEST_CURRENT_GRANTS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestCurrentGrantsError', () => {
    const expectedAction = {
      type: MODALS_REQUEST_CURRENT_GRANTS_DISMISS_ERROR,
    };
    expect(dismissRequestCurrentGrantsError()).to.deep.equal(expectedAction);
  });

  it('handles action type MODALS_REQUEST_CURRENT_GRANTS_BEGIN correctly', () => {
    const prevState = { requestCurrentGrantsPending: false };
    const state = reducer(
      prevState,
      { type: MODALS_REQUEST_CURRENT_GRANTS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCurrentGrantsPending).to.be.true;
  });

  it('handles action type MODALS_REQUEST_CURRENT_GRANTS_SUCCESS correctly', () => {
    const prevState = { requestCurrentGrantsPending: true };
    const state = reducer(
      prevState,
      { type: MODALS_REQUEST_CURRENT_GRANTS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCurrentGrantsPending).to.be.false;
  });

  it('handles action type MODALS_REQUEST_CURRENT_GRANTS_FAILURE correctly', () => {
    const prevState = { requestCurrentGrantsPending: true };
    const state = reducer(
      prevState,
      { type: MODALS_REQUEST_CURRENT_GRANTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCurrentGrantsPending).to.be.false;
    expect(state.requestCurrentGrantsError).to.exist;
  });

  it('handles action type MODALS_REQUEST_CURRENT_GRANTS_DISMISS_ERROR correctly', () => {
    const prevState = { requestCurrentGrantsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MODALS_REQUEST_CURRENT_GRANTS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCurrentGrantsError).to.be.null;
  });
});
