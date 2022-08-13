import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieCommentController } from './movie-comment.controller';
import { MovieCommentEntity } from './movie-comment.entity';
import { MovieCommentService } from './movie-comment.service';

@Module({
  controllers: [MovieCommentController],
  providers: [MovieCommentService],
  imports: [TypeOrmModule.forFeature([MovieCommentEntity])],
})
export class MovieCommentModule {}
