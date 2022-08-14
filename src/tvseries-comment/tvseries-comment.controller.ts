import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/user.decorator';
import { TvSeriesCommentDto } from './tvseries-comment.dto';
import { TvSeriesCommentService } from './tvseries-comment.service';

@Controller('tvseries-comment')
export class TvSeriesCommentController {
  constructor(
    private readonly tvseriesCommentService: TvSeriesCommentService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth()
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: TvSeriesCommentDto,
  ) {
    return this.tvseriesCommentService.create(+userId, dto);
  }
}
