import { expect } from 'chai';

import {
  CLIENTS_UPDATE_LOCAL_HOUSEHOLD_ADD_CLIENT,
} from 'src/features/clients/redux/constants';

import {
  updateLocalHouseholdAddClient,
  reducer,
} from 'src/features/clients/redux/updateLocalHouseholdAddClient';

describe('clients/redux/updateLocalHouseholdAddClient', () => {
  it('returns correct action by updateLocalHouseholdAddClient', () => {
    expect(updateLocalHouseholdAddClient()).to.have.property('type', CLIENTS_UPDATE_LOCAL_HOUSEHOLD_ADD_CLIENT);
  });

  it('handles action type CLIENTS_UPDATE_LOCAL_HOUSEHOLD_ADD_CLIENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENTS_UPDATE_LOCAL_HOUSEHOLD_ADD_CLIENT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
