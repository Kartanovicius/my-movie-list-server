import { IsNumber, IsString } from 'class-validator';

export class MovieCommentDto {
  @IsString()
  message: string;

  @IsNumber()
  movieId: number;
}
