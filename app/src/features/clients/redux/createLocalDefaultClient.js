// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CLIENTS_CREATE_LOCAL_DEFAULT_CLIENT,
} from './constants';

export function createLocalDefaultClient() {
  return {
    type: CLIENTS_CREATE_LOCAL_DEFAULT_CLIENT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENTS_CREATE_LOCAL_DEFAULT_CLIENT:
      return {
        ...state,
        clientInfo: {}
      };

    default:
      return state;
  }
}
