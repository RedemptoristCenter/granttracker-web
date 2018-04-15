import { expect } from 'chai';

import {
  GRANTS_UPDATE_LOCAL_GRANT_INFO,
} from 'src/features/grants/redux/constants';

import {
  updateLocalGrantInfo,
  reducer,
} from 'src/features/grants/redux/updateLocalGrantInfo';

describe('grants/redux/updateLocalGrantInfo', () => {
  it('returns correct action by updateLocalGrantInfo', () => {
    expect(updateLocalGrantInfo()).to.have.property('type', GRANTS_UPDATE_LOCAL_GRANT_INFO);
  });

  it('handles action type GRANTS_UPDATE_LOCAL_GRANT_INFO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: GRANTS_UPDATE_LOCAL_GRANT_INFO }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
