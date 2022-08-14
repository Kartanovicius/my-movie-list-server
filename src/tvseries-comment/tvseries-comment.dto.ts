import { IsNumber, IsString } from 'class-validator';

export class TvSeriesCommentDto {
  @IsString()
  message: string;

  @IsNumber()
  tvseriesId: number;
}
