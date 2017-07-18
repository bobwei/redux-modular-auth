import R from 'ramda';

import REDUCER_KEY from '../constants/REDUCER_KEY';

const getCredentials = (state, { reducerKey = REDUCER_KEY } = {}) =>
  R.path([reducerKey, 'credentials'])(state);

export default R.curry(getCredentials);
