// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Search,
} from './';

export default {
  path: 'grants',
  name: 'Grants',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: Search, isIndex: true },
  ],
};
