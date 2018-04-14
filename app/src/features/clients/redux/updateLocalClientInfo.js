// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CLIENTS_UPDATE_LOCAL_CLIENT_INFO,
} from './constants';

export function updateLocalClientInfo(key, value) {
  return {
    type: CLIENTS_UPDATE_LOCAL_CLIENT_INFO,
    payload: {
      key,
      value
    }
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENTS_UPDATE_LOCAL_CLIENT_INFO:
      const newClientInfo = Object.assign(state.clientInfo);
      newClientInfo[action.payload.key] = action.payload.value;

      return {
        ...state,
        clientInfo: newClientInfo
      };

    default:
      return state;
  }
}
