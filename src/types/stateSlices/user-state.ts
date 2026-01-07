import {AuthorizationStatus} from '../../const.ts';
import {UserDto} from '../responses/user-dto.ts';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: UserDto | null;
};
