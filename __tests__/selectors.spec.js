import { createStore, combineReducers } from 'redux';
import { createStructuredSelector } from 'reselect';
import R from 'ramda';

import { getCredentials } from '../src/index';

describe('selectors', () => {
  const rootReducer = combineReducers({
    auth: () => ({
      credentials: {
        objectId: 1,
        sessionToken: '123',
      },
    }),
  });
  const store = createStore(rootReducer);

  test('getCredentials', () => {
    const { getState } = store;
    const selector = getCredentials;
    expect(selector(getState())).toEqual({
      objectId: 1,
      sessionToken: '123',
    });
  });

  test('mapStateToProps with getCredentials', () => {
    const { getState } = store;
    const mapStateToProps = createStructuredSelector({
      userId: R.compose(R.prop('objectId'), getCredentials),
    });
    expect(mapStateToProps(getState())).toEqual({
      userId: 1,
    });
  });
});
