import { IsString } from 'class-validator';

export class ShowDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  trailerPath: string;

  @IsString()
  posterPath: string;
}
