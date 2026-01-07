import {UserCompactDto} from '../responses/user-compact-dto.ts';

export type ReviewData = {
  id: number;
  date: Date;
  user: UserCompactDto;
  comment: string;
  rating: number;
}
