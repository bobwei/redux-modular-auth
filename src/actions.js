import { createAction } from 'redux-actions';

const modulePrefix = '@@redux-modular-auth/';

export const login = createAction(`${modulePrefix}login`);

export const logout = createAction(`${modulePrefix}logout`);
