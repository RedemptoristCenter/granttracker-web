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
        clientInfo: {
          Fname: '',
          Lname: '',
          Mname: '',
          address: '',
          birth_date: '',
          city: '',
          disability_cd: 59,
          ethnicity_cd: 39,
          family_type_cd: 14,
          gender_cd: 4,
          hoh_client_id: null,
          house_size: 0,
          housing_cd: 53,
          phone_num: '',
          race_cd: 46,
          reltn_to_hoh_cd: 0,
          ssn_cd: 0,
          state: '',
          veteran_cd: 63,
          zipcode: ''
        }
      };

    default:
      return state;
  }
}
