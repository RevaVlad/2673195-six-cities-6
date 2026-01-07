import {State} from '../../../types/state.ts';
import {AuthorizationStatus, NameSpace} from '../../../const.ts';
import {UserDto} from '../../../types/responses/user-dto.ts';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: Pick<State, NameSpace.User>): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getUser = (state: Pick<State, NameSpace.User>): UserDto | null =>
  state[NameSpace.User].user;
