import {clearUserData, setUserData, userData} from './user-slice.ts';
import {AuthorizationStatus, NameSpace} from '../../../const';
import {checkAuthAction, loginAction, logoutAction} from '../../apiActions/user-actions.ts';
import {UserDto} from '../../../types/responses/user-dto.ts';
import {getAuthCheckedStatus, getAuthorizationStatus, getUser} from './user-selectors.ts';

describe('User Slice', () => {
  const mockUser: UserDto = {
    name: 'Test User',
    isPro: false,
    email: 'test@example.com',
    token: 'token',
  };

  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  };

  const authorizedState = {
    authorizationStatus: AuthorizationStatus.Auth,
    user: mockUser,
  };

  describe('initial state', () => {
    it('should return initial state', () => {
      const result = userData.reducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('reducers', () => {
    it('should handle setUserData', () => {
      const action = {
        type: setUserData,
        payload: mockUser
      };
      const result = userData.reducer(initialState, action);

      expect(result.user).toEqual(mockUser);
      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    });

    it('should handle clearUserData', () => {
      const result = userData.reducer(authorizedState, clearUserData);

      expect(result.user).toBeNull();
      expect(result.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
    });
  });

  describe('extraReducers', () => {
    describe('checkAuthAction', () => {
      it('should handle checkAuthAction.fulfilled', () => {
        const action = {
          type: checkAuthAction.fulfilled.type,
          payload: mockUser
        };
        const result = userData.reducer(initialState, action);

        expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
        expect(result.user).toEqual(mockUser);
      });

      it('should handle checkAuthAction.rejected', () => {
        const action = { type: checkAuthAction.rejected.type };
        const result = userData.reducer(authorizedState, action);

        expect(result.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
        expect(result.user).toBe(mockUser);
      });
    });

    describe('loginAction', () => {
      it('should handle loginAction.fulfilled', () => {
        const action = {
          type: loginAction.fulfilled.type,
          payload: mockUser
        };
        const result = userData.reducer(initialState, action);

        expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
        expect(result.user).toEqual(mockUser);
      });

      it('should handle loginAction.rejected', () => {
        const action = { type: loginAction.rejected.type };
        const result = userData.reducer(initialState, action);

        expect(result.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
        expect(result.user).toBeNull();
      });
    });

    describe('logoutAction', () => {
      it('should handle logoutAction.fulfilled', () => {
        const action = { type: logoutAction.fulfilled.type };
        const result = userData.reducer(authorizedState, action);

        expect(result.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
        expect(result.user).toBeNull();
      });
    });
  });

  describe('selectors', () => {
    describe('getAuthorizationStatus', () => {
      it('returns AuthorizationStatus.Unknown for initial state', () => {
        const state = {
          [NameSpace.User]: initialState
        };
        const result = getAuthorizationStatus(state);
        expect(result).toBe(AuthorizationStatus.Unknown);
      });

      it('returns AuthorizationStatus.Auth when user is authenticated', () => {
        const state = {
          [NameSpace.User]: authorizedState
        };
        const result = getAuthorizationStatus(state);
        expect(result).toBe(AuthorizationStatus.Auth);
      });

      it('returns AuthorizationStatus.NotAuth when user is not authenticated', () => {
        const notAuthState = {
          [NameSpace.User]: {
            authorizationStatus: AuthorizationStatus.NotAuth,
            user: null
          }
        };
        const result = getAuthorizationStatus(notAuthState);
        expect(result).toBe(AuthorizationStatus.NotAuth);
      });
    });

    describe('getAuthCheckedStatus', () => {
      it('returns false when authorization status is Unknown', () => {
        const state = {
          [NameSpace.User]: initialState
        };
        const result = getAuthCheckedStatus(state);
        expect(result).toBe(false);
      });

      it('returns true when authorization status is Auth', () => {
        const state = {
          [NameSpace.User]: authorizedState
        };
        const result = getAuthCheckedStatus(state);
        expect(result).toBe(true);
      });

      it('returns true when authorization status is NotAuth', () => {
        const notAuthState = {
          [NameSpace.User]: {
            authorizationStatus: AuthorizationStatus.NotAuth,
            user: null
          }
        };
        const result = getAuthCheckedStatus(notAuthState);
        expect(result).toBe(true);
      });
    });

    describe('getUser', () => {
      it('returns null when no user is logged in', () => {
        const state = {
          [NameSpace.User]: initialState
        };
        const result = getUser(state);
        expect(result).toBeNull();
      });

      it('returns user data when user is authenticated', () => {
        const state = {
          [NameSpace.User]: authorizedState
        };
        const result = getUser(state);
        expect(result).toEqual(mockUser);
      });

      it('returns null after logout', () => {
        const loggedOutState = {
          [NameSpace.User]: {
            authorizationStatus: AuthorizationStatus.NotAuth,
            user: null
          }
        };
        const result = getUser(loggedOutState);
        expect(result).toBeNull();
      });
    });
  });
});
