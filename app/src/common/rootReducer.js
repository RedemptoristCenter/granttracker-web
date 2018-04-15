import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import appReducer from '../features/app/redux/reducer';
import clientsReducer from '../features/clients/redux/reducer';
import grantsReducer from '../features/grants/redux/reducer';
import loginReducer from '../features/login/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage theme.

const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  common: commonReducer,
  app: appReducer,
  clients: clientsReducer,
  grants: grantsReducer,
  login: loginReducer,
};

export default combineReducers(reducerMap);
