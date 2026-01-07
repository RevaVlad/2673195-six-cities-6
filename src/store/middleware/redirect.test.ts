import { Mock, vi } from 'vitest';
import { PayloadAction, MiddlewareAPI, Dispatch } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { REDIRECT_ACTION_TYPE } from '../redirect-action.ts';
import { redirect } from './redirect';
import { rootReducer } from '../root-reducer.ts';

type Reducer = ReturnType<typeof rootReducer>;

vi.mock('../../browser-history', () => ({
  default: {
    push: vi.fn(),
  },
}));

describe('Middleware: redirect', () => {
  let mockNext: Mock;

  beforeEach(() => {
    mockNext = vi.fn((action: PayloadAction<string>) => action);
    vi.clearAllMocks();
  });

  const createMiddleware = () => {
    const store = {
      getState: vi.fn(),
      dispatch: vi.fn(),
    } as unknown as MiddlewareAPI<Dispatch<PayloadAction<string>>, Reducer>;

    const invoke = (action: PayloadAction<string>): PayloadAction<string> =>
      redirect(store)(mockNext)(action) as PayloadAction<string>;

    return { store, invoke };
  };

  it('redirects to the route when action type matches', () => {
    const action: PayloadAction<string> = {
      type: REDIRECT_ACTION_TYPE,
      payload: '/login',
    };

    const { invoke } = createMiddleware();
    invoke(action);

    expect(browserHistory.push).toHaveBeenCalledWith('/login');
    expect(mockNext).toHaveBeenCalledWith(action);
  });

  it('does not redirect when action type does not match', () => {
    const action: PayloadAction<string> = {
      type: 'INCORRECT/ACTION',
      payload: '/login',
    };

    const { invoke } = createMiddleware();
    invoke(action);

    expect(browserHistory.push).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(action);
  });
});
