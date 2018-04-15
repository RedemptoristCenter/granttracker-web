import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  COMMON_SHOW_ALERT_BEGIN,
  COMMON_SHOW_ALERT_SUCCESS,
  COMMON_SHOW_ALERT_FAILURE,
  COMMON_SHOW_ALERT_DISMISS_ERROR,
} from 'src/features/common/redux/constants';

import {
  showAlert,
  dismissShowAlertError,
  reducer,
} from 'src/features/common/redux/showAlert';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/showAlert', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when showAlert succeeds', () => {
    const store = mockStore({});

    return store.dispatch(showAlert())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_SHOW_ALERT_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_SHOW_ALERT_SUCCESS);
      });
  });

  it('dispatches failure action when showAlert fails', () => {
    const store = mockStore({});

    return store.dispatch(showAlert({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_SHOW_ALERT_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_SHOW_ALERT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissShowAlertError', () => {
    const expectedAction = {
      type: COMMON_SHOW_ALERT_DISMISS_ERROR,
    };
    expect(dismissShowAlertError()).to.deep.equal(expectedAction);
  });

  it('handles action type COMMON_SHOW_ALERT_BEGIN correctly', () => {
    const prevState = { showAlertPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_SHOW_ALERT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.showAlertPending).to.be.true;
  });

  it('handles action type COMMON_SHOW_ALERT_SUCCESS correctly', () => {
    const prevState = { showAlertPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SHOW_ALERT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.showAlertPending).to.be.false;
  });

  it('handles action type COMMON_SHOW_ALERT_FAILURE correctly', () => {
    const prevState = { showAlertPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SHOW_ALERT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.showAlertPending).to.be.false;
    expect(state.showAlertError).to.exist;
  });

  it('handles action type COMMON_SHOW_ALERT_DISMISS_ERROR correctly', () => {
    const prevState = { showAlertError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_SHOW_ALERT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.showAlertError).to.be.null;
  });
});
