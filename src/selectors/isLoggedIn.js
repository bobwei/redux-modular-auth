import { createSelector } from 'reselect';
import R from 'ramda';

const isLoggedIn = createSelector(
  R.path(['auth', 'credentials']),
  R.propSatisfies(R.compose(R.not, R.isNil), 'sessionToken'),
);

export default isLoggedIn;
