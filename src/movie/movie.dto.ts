import { IsString } from 'class-validator';

export class MovieDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  trailerPath: string;

  @IsString()
  posterPath: string;
}
