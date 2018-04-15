import { expect } from 'chai';

import {
  MODALS_CLOSE_MODAL,
} from 'src/features/modals/redux/constants';

import {
  closeModal,
  reducer,
} from 'src/features/modals/redux/closeModal';

describe('modals/redux/closeModal', () => {
  it('returns correct action by closeModal', () => {
    expect(closeModal()).to.have.property('type', MODALS_CLOSE_MODAL);
  });

  it('handles action type MODALS_CLOSE_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MODALS_CLOSE_MODAL }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
