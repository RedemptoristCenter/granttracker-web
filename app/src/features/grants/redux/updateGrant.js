import axios from 'axios';
import {
  GRANTS_UPDATE_GRANT_BEGIN,
  GRANTS_UPDATE_GRANT_SUCCESS,
  GRANTS_UPDATE_GRANT_FAILURE,
  GRANTS_UPDATE_GRANT_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function updateGrant(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: GRANTS_UPDATE_GRANT_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.

      const doRequest = axios.post(`${window.app_config.api_url}/grant/update/${args.grantInfo.grant_id}`, args.grantInfo);
      doRequest.then(
        (res) => {
          dispatch({
            type: GRANTS_UPDATE_GRANT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          if (err.response.status === 401) { window.location.href = '/login'; }
          dispatch({
            type: GRANTS_UPDATE_GRANT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissUpdateGrantError() {
  return {
    type: GRANTS_UPDATE_GRANT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GRANTS_UPDATE_GRANT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateGrantPending: true,
        updateGrantError: null,
      };

    case GRANTS_UPDATE_GRANT_SUCCESS:
      // The request is success
      return {
        ...state,
        updateGrantPending: false,
        updateGrantError: null,
      };

    case GRANTS_UPDATE_GRANT_FAILURE:
      // The request is failed
      return {
        ...state,
        updateGrantPending: false,
        updateGrantError: action.data.error,
      };

    case GRANTS_UPDATE_GRANT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateGrantError: null,
      };

    default:
      return state;
  }
}
