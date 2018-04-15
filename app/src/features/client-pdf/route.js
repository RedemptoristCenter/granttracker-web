// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Create,
  Consent,
} from './';

export default {
  path: 'client-pdf',
  name: 'Client pdf',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'create', name: 'Create', component: Create },
    { path: 'consent', name: 'Consent', component: Consent },
  ],
};
