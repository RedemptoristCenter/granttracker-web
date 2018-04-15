import { expect } from 'chai';

import {
  GRANTS_CREATE_LOCAL_DEFAULT_GRANT,
} from 'src/features/grants/redux/constants';

import {
  createLocalDefaultGrant,
  reducer,
} from 'src/features/grants/redux/createLocalDefaultGrant';

describe('grants/redux/createLocalDefaultGrant', () => {
  it('returns correct action by createLocalDefaultGrant', () => {
    expect(createLocalDefaultGrant()).to.have.property('type', GRANTS_CREATE_LOCAL_DEFAULT_GRANT);
  });

  it('handles action type GRANTS_CREATE_LOCAL_DEFAULT_GRANT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: GRANTS_CREATE_LOCAL_DEFAULT_GRANT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
