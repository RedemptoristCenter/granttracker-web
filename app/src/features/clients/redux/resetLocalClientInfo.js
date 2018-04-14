// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CLIENTS_RESET_LOCAL_CLIENT_INFO,
} from './constants';

export function resetLocalClientInfo() {
  return {
    type: CLIENTS_RESET_LOCAL_CLIENT_INFO,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENTS_RESET_LOCAL_CLIENT_INFO:
      return {
        ...state,
        clientInfo: null
      };

    default:
      return state;
  }
}
