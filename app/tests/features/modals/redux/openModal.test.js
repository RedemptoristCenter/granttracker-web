import { expect } from 'chai';

import {
  MODALS_OPEN_MODAL,
} from 'src/features/modals/redux/constants';

import {
  openModal,
  reducer,
} from 'src/features/modals/redux/openModal';

describe('modals/redux/openModal', () => {
  it('returns correct action by openModal', () => {
    expect(openModal()).to.have.property('type', MODALS_OPEN_MODAL);
  });

  it('handles action type MODALS_OPEN_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MODALS_OPEN_MODAL }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
