import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  GRANTS_UPDATE_GRANT_BEGIN,
  GRANTS_UPDATE_GRANT_SUCCESS,
  GRANTS_UPDATE_GRANT_FAILURE,
  GRANTS_UPDATE_GRANT_DISMISS_ERROR,
} from 'src/features/grants/redux/constants';

import {
  updateGrant,
  dismissUpdateGrantError,
  reducer,
} from 'src/features/grants/redux/updateGrant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('grants/redux/updateGrant', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateGrant succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateGrant())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', GRANTS_UPDATE_GRANT_BEGIN);
        expect(actions[1]).to.have.property('type', GRANTS_UPDATE_GRANT_SUCCESS);
      });
  });

  it('dispatches failure action when updateGrant fails', () => {
    const store = mockStore({});

    return store.dispatch(updateGrant({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', GRANTS_UPDATE_GRANT_BEGIN);
        expect(actions[1]).to.have.property('type', GRANTS_UPDATE_GRANT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUpdateGrantError', () => {
    const expectedAction = {
      type: GRANTS_UPDATE_GRANT_DISMISS_ERROR,
    };
    expect(dismissUpdateGrantError()).to.deep.equal(expectedAction);
  });

  it('handles action type GRANTS_UPDATE_GRANT_BEGIN correctly', () => {
    const prevState = { updateGrantPending: false };
    const state = reducer(
      prevState,
      { type: GRANTS_UPDATE_GRANT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateGrantPending).to.be.true;
  });

  it('handles action type GRANTS_UPDATE_GRANT_SUCCESS correctly', () => {
    const prevState = { updateGrantPending: true };
    const state = reducer(
      prevState,
      { type: GRANTS_UPDATE_GRANT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateGrantPending).to.be.false;
  });

  it('handles action type GRANTS_UPDATE_GRANT_FAILURE correctly', () => {
    const prevState = { updateGrantPending: true };
    const state = reducer(
      prevState,
      { type: GRANTS_UPDATE_GRANT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateGrantPending).to.be.false;
    expect(state.updateGrantError).to.exist;
  });

  it('handles action type GRANTS_UPDATE_GRANT_DISMISS_ERROR correctly', () => {
    const prevState = { updateGrantError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GRANTS_UPDATE_GRANT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateGrantError).to.be.null;
  });
});
