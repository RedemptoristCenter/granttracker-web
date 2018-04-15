// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Detail,
} from './';

export default {
  path: 'reports',
  name: 'Reports',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: '/reports/:grant_id', name: 'Detail', component: Detail },
  ],
};
