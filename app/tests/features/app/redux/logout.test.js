import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  APP_LOGOUT_BEGIN,
  APP_LOGOUT_SUCCESS,
  APP_LOGOUT_FAILURE,
  APP_LOGOUT_DISMISS_ERROR,
} from 'src/features/app/redux/constants';

import {
  logout,
  dismissLogoutError,
  reducer,
} from 'src/features/app/redux/logout';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('app/redux/logout', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when logout succeeds', () => {
    const store = mockStore({});

    return store.dispatch(logout())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', APP_LOGOUT_BEGIN);
        expect(actions[1]).to.have.property('type', APP_LOGOUT_SUCCESS);
      });
  });

  it('dispatches failure action when logout fails', () => {
    const store = mockStore({});

    return store.dispatch(logout({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', APP_LOGOUT_BEGIN);
        expect(actions[1]).to.have.property('type', APP_LOGOUT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLogoutError', () => {
    const expectedAction = {
      type: APP_LOGOUT_DISMISS_ERROR,
    };
    expect(dismissLogoutError()).to.deep.equal(expectedAction);
  });

  it('handles action type APP_LOGOUT_BEGIN correctly', () => {
    const prevState = { logoutPending: false };
    const state = reducer(
      prevState,
      { type: APP_LOGOUT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.logoutPending).to.be.true;
  });

  it('handles action type APP_LOGOUT_SUCCESS correctly', () => {
    const prevState = { logoutPending: true };
    const state = reducer(
      prevState,
      { type: APP_LOGOUT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.logoutPending).to.be.false;
  });

  it('handles action type APP_LOGOUT_FAILURE correctly', () => {
    const prevState = { logoutPending: true };
    const state = reducer(
      prevState,
      { type: APP_LOGOUT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.logoutPending).to.be.false;
    expect(state.logoutError).to.exist;
  });

  it('handles action type APP_LOGOUT_DISMISS_ERROR correctly', () => {
    const prevState = { logoutError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: APP_LOGOUT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.logoutError).to.be.null;
  });
});
