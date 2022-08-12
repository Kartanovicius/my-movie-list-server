import { IsString } from 'class-validator';

export class MovieDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  moviePath: string;

  @IsString()
  posterPath: string;
}
