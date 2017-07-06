import { createStore, combineReducers } from 'redux';
import { createStructuredSelector } from 'reselect';

import { createReducer, login, logout, isAuthenticated } from '../src/index';

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

  const mapStateToProps = createStructuredSelector({
    isAuthenticated,
  });
  expect(mapStateToProps(getState())).toEqual({
    isAuthenticated: true,
  });

  dispatch(logout());
  expect(getState()).toEqual({
    auth: {
      credentials: {},
    },
  });
  expect(mapStateToProps(getState())).toEqual({
    isAuthenticated: false,
  });
});
