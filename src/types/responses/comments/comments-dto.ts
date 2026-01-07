import {UserCompactDto} from '../user-compact-dto.ts';

export type CommentDto = {
  id: number;
  date: string;
  user: UserCompactDto;
  comment: string;
  rating: number;
}

