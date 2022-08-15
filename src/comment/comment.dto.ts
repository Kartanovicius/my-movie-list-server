import { IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  message: string;

  @IsNumber()
  showId: number;
}
