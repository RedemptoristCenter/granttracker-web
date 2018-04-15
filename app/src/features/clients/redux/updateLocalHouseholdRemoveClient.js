// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CLIENTS_UPDATE_LOCAL_HOUSEHOLD_REMOVE_CLIENT,
} from './constants';

export function updateLocalHouseholdRemoveClient(client_id) {
  return {
    type: CLIENTS_UPDATE_LOCAL_HOUSEHOLD_REMOVE_CLIENT,
    payload: {
      client_id
    }
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENTS_UPDATE_LOCAL_HOUSEHOLD_REMOVE_CLIENT:
      const newHousehold = Object.assign(state.household);
      const index = newHousehold.findIndex(client => client.client_id === action.payload.client_id);

      if (index >= 0) {
        delete newHousehold[index];
      }

      return {
        ...state,
        household: newHousehold
      };

    default:
      return state;
  }
}
