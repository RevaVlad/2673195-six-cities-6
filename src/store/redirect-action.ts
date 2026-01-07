import {createAction} from '@reduxjs/toolkit';

export const REDIRECT_ACTION_TYPE = 'redirectToRoute';

export const redirectToRoute = createAction<string>(REDIRECT_ACTION_TYPE);
