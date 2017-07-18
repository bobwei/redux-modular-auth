import { createSelector } from 'reselect';
import R from 'ramda';

import getCredentials from './getCredentials';

const isAuthenticated = createSelector(
  getCredentials,
  R.propSatisfies(R.compose(R.not, R.isNil), 'sessionToken'),
);

export default isAuthenticated;
