// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CLIENTS_UPDATE_LOCAL_HOUSEHOLD_ADD_CLIENT,
} from './constants';

export function updateLocalHouseholdAddClient(client) {
  return {
    type: CLIENTS_UPDATE_LOCAL_HOUSEHOLD_ADD_CLIENT,
    payload: {
      client
    }
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENTS_UPDATE_LOCAL_HOUSEHOLD_ADD_CLIENT:
      const newHousehold = Object.assign(state.household);
      newHousehold.unshift(action.payload.client);
      console.log('new', newHousehold);
      return {
        ...state,
        household: newHousehold
      };

    default:
      return state;
  }
}
