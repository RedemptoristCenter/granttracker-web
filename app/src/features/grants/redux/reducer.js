// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as requestSearchReducer } from './requestSearch';
import { reducer as requestGrantByIdReducer } from './requestGrantById';
import { reducer as updateLocalGrantInfoReducer } from './updateLocalGrantInfo';
import { reducer as createLocalDefaultGrantReducer } from './createLocalDefaultGrant';
import { reducer as getGrantLogReducer } from './getGrantLog';
import { reducer as createGrantReducer } from './createGrant';

const reducers = [
  requestSearchReducer,
  requestGrantByIdReducer,
  updateLocalGrantInfoReducer,
  createLocalDefaultGrantReducer,
  getGrantLogReducer,
  createGrantReducer,
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
