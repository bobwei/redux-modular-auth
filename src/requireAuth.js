import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import R from 'ramda';
import compose from 'recompose/compose';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import mapProps from 'recompose/mapProps';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import lifecycle from 'recompose/lifecycle';

import isAuthenticatedInSelector from './selectors/isAuthenticated';

const requireAuth = (
  {
    /*
      Selector used to determine is authenticated
    */
    isAuthenticated = isAuthenticatedInSelector,
    /*
      Component to be rendered when isAuthenticated is false
    */
    UnauthenticatedComponent = () => null,
    onAuthenticated = () => {},
    onUnauthenticated = () => {},
  } = {},
) =>
  compose(
    connect(
      createStructuredSelector({
        isAuthenticated,
      }),
    ),
    onlyUpdateForKeys(['isAuthenticated']),
    lifecycle({
      componentWillReceiveProps(nextProps) {
        R.ifElse(
          R.propEq('isAuthenticated', true),
          onAuthenticated,
          onUnauthenticated,
        )(nextProps);
      },
    }),
    branch(
      R.propEq('isAuthenticated', false),
      renderComponent(UnauthenticatedComponent),
    ),
    mapProps(R.omit(['isAuthenticated', 'dispatch'])),
  );

export default requireAuth;
