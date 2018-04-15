import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  GRANTS_GET_GRANT_LOG_BEGIN,
  GRANTS_GET_GRANT_LOG_SUCCESS,
  GRANTS_GET_GRANT_LOG_FAILURE,
  GRANTS_GET_GRANT_LOG_DISMISS_ERROR,
} from 'src/features/grants/redux/constants';

import {
  getGrantLog,
  dismissGetGrantLogError,
  reducer,
} from 'src/features/grants/redux/getGrantLog';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('grants/redux/getGrantLog', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getGrantLog succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getGrantLog())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', GRANTS_GET_GRANT_LOG_BEGIN);
        expect(actions[1]).to.have.property('type', GRANTS_GET_GRANT_LOG_SUCCESS);
      });
  });

  it('dispatches failure action when getGrantLog fails', () => {
    const store = mockStore({});

    return store.dispatch(getGrantLog({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', GRANTS_GET_GRANT_LOG_BEGIN);
        expect(actions[1]).to.have.property('type', GRANTS_GET_GRANT_LOG_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetGrantLogError', () => {
    const expectedAction = {
      type: GRANTS_GET_GRANT_LOG_DISMISS_ERROR,
    };
    expect(dismissGetGrantLogError()).to.deep.equal(expectedAction);
  });

  it('handles action type GRANTS_GET_GRANT_LOG_BEGIN correctly', () => {
    const prevState = { getGrantLogPending: false };
    const state = reducer(
      prevState,
      { type: GRANTS_GET_GRANT_LOG_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getGrantLogPending).to.be.true;
  });

  it('handles action type GRANTS_GET_GRANT_LOG_SUCCESS correctly', () => {
    const prevState = { getGrantLogPending: true };
    const state = reducer(
      prevState,
      { type: GRANTS_GET_GRANT_LOG_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getGrantLogPending).to.be.false;
  });

  it('handles action type GRANTS_GET_GRANT_LOG_FAILURE correctly', () => {
    const prevState = { getGrantLogPending: true };
    const state = reducer(
      prevState,
      { type: GRANTS_GET_GRANT_LOG_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getGrantLogPending).to.be.false;
    expect(state.getGrantLogError).to.exist;
  });

  it('handles action type GRANTS_GET_GRANT_LOG_DISMISS_ERROR correctly', () => {
    const prevState = { getGrantLogError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GRANTS_GET_GRANT_LOG_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getGrantLogError).to.be.null;
  });
});
