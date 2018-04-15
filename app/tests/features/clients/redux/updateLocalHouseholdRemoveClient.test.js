import { expect } from 'chai';

import {
  CLIENTS_UPDATE_LOCAL_HOUSEHOLD_REMOVE_CLIENT,
} from 'src/features/clients/redux/constants';

import {
  updateLocalHouseholdRemoveClient,
  reducer,
} from 'src/features/clients/redux/updateLocalHouseholdRemoveClient';

describe('clients/redux/updateLocalHouseholdRemoveClient', () => {
  it('returns correct action by updateLocalHouseholdRemoveClient', () => {
    expect(updateLocalHouseholdRemoveClient()).to.have.property('type', CLIENTS_UPDATE_LOCAL_HOUSEHOLD_REMOVE_CLIENT);
  });

  it('handles action type CLIENTS_UPDATE_LOCAL_HOUSEHOLD_REMOVE_CLIENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENTS_UPDATE_LOCAL_HOUSEHOLD_REMOVE_CLIENT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
