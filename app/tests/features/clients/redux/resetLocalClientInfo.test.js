import { expect } from 'chai';

import {
  CLIENTS_RESET_LOCAL_CLIENT_INFO,
} from 'src/features/clients/redux/constants';

import {
  resetLocalClientInfo,
  reducer,
} from 'src/features/clients/redux/resetLocalClientInfo';

describe('clients/redux/resetLocalClientInfo', () => {
  it('returns correct action by resetLocalClientInfo', () => {
    expect(resetLocalClientInfo()).to.have.property('type', CLIENTS_RESET_LOCAL_CLIENT_INFO);
  });

  it('handles action type CLIENTS_RESET_LOCAL_CLIENT_INFO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENTS_RESET_LOCAL_CLIENT_INFO }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
