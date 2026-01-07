export type PostCommentRequest = {
  offerId: string;
  comment: NewCommentDto;
};

export type NewCommentDto = {
  comment: string;
  rating: number;
}
