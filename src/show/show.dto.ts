import { ArrayUnique, IsArray, IsIn, IsString } from 'class-validator';

export class ShowDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayUnique()
  @IsIn(
    [
      'comedy',
      'fantasy',
      'drama',
      'history',
      'horror',
      'adventure',
      'action',
      'noir',
      'thriller',
    ],
    { each: true },
  )
  genre: string[] | string;

  @IsString()
  trailerPath: string;

  @IsString()
  posterPath: string;
}
