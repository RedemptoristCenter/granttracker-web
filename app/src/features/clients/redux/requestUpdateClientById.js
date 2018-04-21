import axios from 'axios';
import {
  CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_BEGIN,
  CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_SUCCESS,
  CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_FAILURE,
  CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function requestUpdateClientById(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.post(`${window.app_config.api_url}/client/update/${args.client_id}`, args);
      doRequest.then(
        (res) => {
          dispatch({
            type: CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          if (err.response.status === 401) { window.location.href = '/login'; }
          dispatch({
            type: CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_FAILURE,
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
export function dismissRequestUpdateClientByIdError() {
  return {
    type: CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        requestUpdateClientByIdPending: true,
        requestUpdateClientByIdError: null,
      };

    case CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_SUCCESS:
      // The request is success
      return {
        ...state,
        requestUpdateClientByIdPending: false,
        requestUpdateClientByIdError: null,
      };

    case CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_FAILURE:
      // The request is failed
      return {
        ...state,
        requestUpdateClientByIdPending: false,
        requestUpdateClientByIdError: action.data.error,
      };

    case CLIENTS_REQUEST_UPDATE_CLIENT_BY_ID_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        requestUpdateClientByIdError: null,
      };

    default:
      return state;
  }
}
