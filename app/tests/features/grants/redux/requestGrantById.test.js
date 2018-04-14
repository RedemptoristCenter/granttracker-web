import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  GRANTS_REQUEST_GRANT_BY_ID_BEGIN,
  GRANTS_REQUEST_GRANT_BY_ID_SUCCESS,
  GRANTS_REQUEST_GRANT_BY_ID_FAILURE,
  GRANTS_REQUEST_GRANT_BY_ID_DISMISS_ERROR,
} from 'src/features/grants/redux/constants';

import {
  requestGrantById,
  dismissRequestGrantByIdError,
  reducer,
} from 'src/features/grants/redux/requestGrantById';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('grants/redux/requestGrantById', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestGrantById succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestGrantById())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', GRANTS_REQUEST_GRANT_BY_ID_BEGIN);
        expect(actions[1]).to.have.property('type', GRANTS_REQUEST_GRANT_BY_ID_SUCCESS);
      });
  });

  it('dispatches failure action when requestGrantById fails', () => {
    const store = mockStore({});

    return store.dispatch(requestGrantById({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', GRANTS_REQUEST_GRANT_BY_ID_BEGIN);
        expect(actions[1]).to.have.property('type', GRANTS_REQUEST_GRANT_BY_ID_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestGrantByIdError', () => {
    const expectedAction = {
      type: GRANTS_REQUEST_GRANT_BY_ID_DISMISS_ERROR,
    };
    expect(dismissRequestGrantByIdError()).to.deep.equal(expectedAction);
  });

  it('handles action type GRANTS_REQUEST_GRANT_BY_ID_BEGIN correctly', () => {
    const prevState = { requestGrantByIdPending: false };
    const state = reducer(
      prevState,
      { type: GRANTS_REQUEST_GRANT_BY_ID_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestGrantByIdPending).to.be.true;
  });

  it('handles action type GRANTS_REQUEST_GRANT_BY_ID_SUCCESS correctly', () => {
    const prevState = { requestGrantByIdPending: true };
    const state = reducer(
      prevState,
      { type: GRANTS_REQUEST_GRANT_BY_ID_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestGrantByIdPending).to.be.false;
  });

  it('handles action type GRANTS_REQUEST_GRANT_BY_ID_FAILURE correctly', () => {
    const prevState = { requestGrantByIdPending: true };
    const state = reducer(
      prevState,
      { type: GRANTS_REQUEST_GRANT_BY_ID_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestGrantByIdPending).to.be.false;
    expect(state.requestGrantByIdError).to.exist;
  });

  it('handles action type GRANTS_REQUEST_GRANT_BY_ID_DISMISS_ERROR correctly', () => {
    const prevState = { requestGrantByIdError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GRANTS_REQUEST_GRANT_BY_ID_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestGrantByIdError).to.be.null;
  });
});
