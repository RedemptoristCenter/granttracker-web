// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  GRANTS_CREATE_LOCAL_DEFAULT_GRANT,
} from './constants';

export function createLocalDefaultGrant() {
  return {
    type: GRANTS_CREATE_LOCAL_DEFAULT_GRANT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GRANTS_CREATE_LOCAL_DEFAULT_GRANT:
      return {
        ...state,
        grantInfo: {}
      };

    default:
      return state;
  }
}
