// @flow
import R from 'ramda';
import { handleActions } from 'redux-actions';

import { login, logout } from './actions';

const createReducer = () => {
  const initialState = {
    credentials: {},
  };

  const reducer = handleActions(
    {
      [login]: (state, { payload }) =>
        R.assocPath(['credentials'], payload, state),
      [logout]: state =>
        R.assocPath(['credentials'], {}, state),
    },
    initialState,
  );

  return reducer;
};

export default createReducer;
