// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  MODALS_OPEN_MODAL,
} from './constants';

export function openModal(modal, size) {
  return {
    type: MODALS_OPEN_MODAL,
    payload: {
      modal,
      size
    }
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MODALS_OPEN_MODAL:
      return {
        ...state,
        open: true,
        currentModal: action.payload.modal,
        modalSize: action.payload.size
      };

    default:
      return state;
  }
}
