import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import compose from 'recompose/compose';

import { requireAuth, createReducer, login } from '../src';

it('can render correct component depending on auth state', () => {
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

  /*
    Component to be protected
  */
  const AuthenticatedRequiredComp = () => <div id="authenticated-required" />;
  /*
    Component to be rendered if isAuthenticated is false
  */
  const UnauthenticatedComponent = () => <div id="unauthenticated-component" />;

  const EnhancedComp = compose(
    requireAuth({
      UnauthenticatedComponent,
    }),
  )(AuthenticatedRequiredComp);

  const wrapper = mount(
    <Provider store={store}>
      <EnhancedComp />
    </Provider>,
  );

  /*
    Not yet authenticated, so it shouldn't contains authenticated required components.
    Instead, there should be UnauthenticatedComponent
  */
  expect(wrapper.contains(<div id="authenticated-required" />)).toBe(false);
  expect(wrapper.contains(<div id="unauthenticated-component" />)).toBe(true);

  const credentials = {
    objectId: 'MY_USER_ID',
    sessionToken: 'MY_SESSION_TOKEN',
  };
  dispatch(login(credentials));
  /*
    Should contains authenticated required components.
  */
  expect(wrapper.contains(<div id="authenticated-required" />)).toBe(true);
  expect(wrapper.contains(<div id="login-component" />)).toBe(false);
});
