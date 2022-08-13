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
import { MovieCommentDto } from './movie-comment.dto';
import { MovieCommentService } from './movie-comment.service';

@Controller('movie-comment')
export class MovieCommentController {
  constructor(private readonly movieCommentService: MovieCommentService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth()
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: MovieCommentDto,
  ) {
    return this.movieCommentService.create(+userId, dto);
  }
}
