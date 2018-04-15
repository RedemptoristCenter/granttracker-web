import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  GRANTS_CREATE_GRANT_BEGIN,
  GRANTS_CREATE_GRANT_SUCCESS,
  GRANTS_CREATE_GRANT_FAILURE,
  GRANTS_CREATE_GRANT_DISMISS_ERROR,
} from 'src/features/grants/redux/constants';

import {
  createGrant,
  dismissCreateGrantError,
  reducer,
} from 'src/features/grants/redux/createGrant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('grants/redux/createGrant', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createGrant succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createGrant())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', GRANTS_CREATE_GRANT_BEGIN);
        expect(actions[1]).to.have.property('type', GRANTS_CREATE_GRANT_SUCCESS);
      });
  });

  it('dispatches failure action when createGrant fails', () => {
    const store = mockStore({});

    return store.dispatch(createGrant({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', GRANTS_CREATE_GRANT_BEGIN);
        expect(actions[1]).to.have.property('type', GRANTS_CREATE_GRANT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissCreateGrantError', () => {
    const expectedAction = {
      type: GRANTS_CREATE_GRANT_DISMISS_ERROR,
    };
    expect(dismissCreateGrantError()).to.deep.equal(expectedAction);
  });

  it('handles action type GRANTS_CREATE_GRANT_BEGIN correctly', () => {
    const prevState = { createGrantPending: false };
    const state = reducer(
      prevState,
      { type: GRANTS_CREATE_GRANT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createGrantPending).to.be.true;
  });

  it('handles action type GRANTS_CREATE_GRANT_SUCCESS correctly', () => {
    const prevState = { createGrantPending: true };
    const state = reducer(
      prevState,
      { type: GRANTS_CREATE_GRANT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createGrantPending).to.be.false;
  });

  it('handles action type GRANTS_CREATE_GRANT_FAILURE correctly', () => {
    const prevState = { createGrantPending: true };
    const state = reducer(
      prevState,
      { type: GRANTS_CREATE_GRANT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createGrantPending).to.be.false;
    expect(state.createGrantError).to.exist;
  });

  it('handles action type GRANTS_CREATE_GRANT_DISMISS_ERROR correctly', () => {
    const prevState = { createGrantError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GRANTS_CREATE_GRANT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createGrantError).to.be.null;
  });
});
