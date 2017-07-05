import { createStore, combineReducers } from 'redux';
import { createSelector } from 'reselect';
import R from 'ramda';

import { createReducer, login, logout } from '../src/index';

it('can createReducer and update state with actions', () => {
  const rootReducer = combineReducers({
    auth: createReducer(),
  });
  const store = createStore(rootReducer);
  const { getState, dispatch } = store;
  expect(getState()).toEqual({
    auth: {
      credentials: {},
    },
  });

  const credentials = {
    objectId: 'MY_USER_ID',
    sessionToken: 'MY_SESSION_TOKEN',
  };
  dispatch(login(credentials));
  expect(getState()).toEqual({
    auth: {
      credentials: {
        objectId: 'MY_USER_ID',
        sessionToken: 'MY_SESSION_TOKEN',
      },
    },
  });

  const mapStateToProps = createSelector(
    R.path(['auth', 'credentials']),
    R.applySpec({
      isLoggedIn: R.propSatisfies(R.compose(R.not, R.isNil), 'sessionToken'),
    }),
  );
  expect(mapStateToProps(getState())).toEqual({
    isLoggedIn: true,
  });

  dispatch(logout());
  expect(getState()).toEqual({
    auth: {
      credentials: {},
    },
  });
  expect(mapStateToProps(getState())).toEqual({
    isLoggedIn: false,
  });
});
