import { createSelector } from 'reselect';
import R from 'ramda';

const isAuthenticated = createSelector(
  R.path(['auth', 'credentials']),
  R.propSatisfies(R.compose(R.not, R.isNil), 'sessionToken'),
);

export default isAuthenticated;
