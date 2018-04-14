import { expect } from 'chai';

import {
  CLIENTS_UPDATE_LOCAL_CLIENT_INFO,
} from 'src/features/clients/redux/constants';

import {
  updateLocalClientInfo,
  reducer,
} from 'src/features/clients/redux/updateLocalClientInfo';

describe('clients/redux/updateLocalClientInfo', () => {
  it('returns correct action by updateLocalClientInfo', () => {
    expect(updateLocalClientInfo()).to.have.property('type', CLIENTS_UPDATE_LOCAL_CLIENT_INFO);
  });

  it('handles action type CLIENTS_UPDATE_LOCAL_CLIENT_INFO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENTS_UPDATE_LOCAL_CLIENT_INFO }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
