# redux-modular-auth

Manage auth state with ease.

- [Installation](#installation)
- [Usage Example](#usage-example)


## Installation

```
yarn add redux-modular-auth
```


## Usage Example

The store should know how to handle actions. To enable this, we need to create the authReducer to your store. It serves for all of your auth related state, so you only have to pass it once.

#### Create auth reducer

```js
import { createStore, combineReducers } from 'redux';
import { createSelector } from 'reselect';
import R from 'ramda';
import { createReducer } from 'redux-modular-auth';

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
const mapStateToProps = createSelector(
  R.path(['auth', 'credentials']),
  R.applySpec({
    isLoggedIn: R.propSatisfies(R.compose(R.not, R.isNil), 'sessionToken'),
  }),
);
expect(mapStateToProps(getState())).toEqual({
  isLoggedIn: true,
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
  isLoggedIn: false,
});
```
