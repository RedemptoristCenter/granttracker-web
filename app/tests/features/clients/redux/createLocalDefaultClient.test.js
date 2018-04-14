import { expect } from 'chai';

import {
  CLIENTS_CREATE_LOCAL_DEFAULT_CLIENT,
} from 'src/features/clients/redux/constants';

import {
  createLocalDefaultClient,
  reducer,
} from 'src/features/clients/redux/createLocalDefaultClient';

describe('clients/redux/createLocalDefaultClient', () => {
  it('returns correct action by createLocalDefaultClient', () => {
    expect(createLocalDefaultClient()).to.have.property('type', CLIENTS_CREATE_LOCAL_DEFAULT_CLIENT);
  });

  it('handles action type CLIENTS_CREATE_LOCAL_DEFAULT_CLIENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENTS_CREATE_LOCAL_DEFAULT_CLIENT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
