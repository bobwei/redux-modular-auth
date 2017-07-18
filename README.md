# redux-modular-auth

Manage auth state with ease.

- [Installation](#installation)
- [Usage Example](#usage-example)
  - [Authentication](#authentication)
  - [requireAuth](#requireauth)
  - [Selectors](#./docs/selectors.md)


## Installation

```
yarn add redux-modular-auth
```


## Usage Example

### Authentication

The store should know how to handle actions. To enable this, we need to create the authReducer to your store. It serves for all of your auth related state, so you only have to pass it once.

#### Create auth reducer

```js
import { createStore, combineReducers } from 'redux';
import { createSelector } from 'reselect';
import R from 'ramda';
import { createReducer, login, logout, isAuthenticated } from 'redux-modular-auth';

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
```

#### Dispatch actions to update state

Login with credentials

```js
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
```

Check if user is logged in

```js
const mapStateToProps = createStructuredSelector({
  isAuthenticated,
});
expect(mapStateToProps(getState())).toEqual({
  isAuthenticated: true,
});
```

Logout

```js
dispatch(logout());
expect(getState()).toEqual({
  auth: {
    credentials: {},
  },
});
expect(mapStateToProps(getState())).toEqual({
  isAuthenticated: false,
});
```

### requireAuth

Higher order component controlling component to render depending on auth state.

```js
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import compose from 'recompose/compose';

import { requireAuth, createReducer, login } from 'redux-modular-auth';

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
```
