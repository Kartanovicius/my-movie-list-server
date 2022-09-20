import { IsNumber } from 'class-validator';

export class CreateUserRatingDto {
  @IsNumber()
  rating: number;

  @IsNumber()
  showId: number;
}
