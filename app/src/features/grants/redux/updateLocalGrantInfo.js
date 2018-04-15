// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  GRANTS_UPDATE_LOCAL_GRANT_INFO,
} from './constants';

export function updateLocalGrantInfo(key, value) {
  return {
    type: GRANTS_UPDATE_LOCAL_GRANT_INFO,
    payload: {
      key,
      value
    }
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GRANTS_UPDATE_LOCAL_GRANT_INFO:
      const newGrantInfo = Object.assign(state.grantInfo);
      newGrantInfo[action.payload.key] = action.payload.value;

      return {
        ...state,
        grantInfo: newGrantInfo
      };

    default:
      return state;
  }
}
