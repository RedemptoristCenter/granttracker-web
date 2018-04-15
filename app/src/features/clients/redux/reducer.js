// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as requestSearchReducer } from './requestSearch';
import { reducer as requestClientByIdReducer } from './requestClientById';
import { reducer as updateLocalClientInfoReducer } from './updateLocalClientInfo';
import { reducer as createLocalDefaultClientReducer } from './createLocalDefaultClient';
import { reducer as requestCodesetReducer } from './requestCodeset';
import { reducer as resetLocalClientInfoReducer } from './resetLocalClientInfo';
import { reducer as requestNewClientReducer } from './requestNewClient';
import { reducer as requestUpdateClientByIdReducer } from './requestUpdateClientById';
import { reducer as updateLocalHouseholdAddClientReducer } from './updateLocalHouseholdAddClient';
import { reducer as requestClientHouseholdReducer } from './requestClientHousehold';
import { reducer as updateLocalHouseholdRemoveClientReducer } from './updateLocalHouseholdRemoveClient';
import { reducer as requestUpdateClientHouseholdReducer } from './requestUpdateClientHousehold';

const reducers = [
  requestSearchReducer,
  requestClientByIdReducer,
  updateLocalClientInfoReducer,
  createLocalDefaultClientReducer,
  requestCodesetReducer,
  resetLocalClientInfoReducer,
  requestNewClientReducer,
  requestUpdateClientByIdReducer,
  updateLocalHouseholdAddClientReducer,
  requestClientHouseholdReducer,
  updateLocalHouseholdRemoveClientReducer,
  requestUpdateClientHouseholdReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
